import fetch from "./fetch"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
const isDocsieLink = /^docsie:/

function preparehref(rootPath, href) {
  switch (true) {
    case isDocsieLink.test(href):
      let props = {}
      const frags = href.replace("docsie://", "").split("/")
      frags.forEach((frag) => {
        switch (true) {
          case /^_s:/.test(frag):
            props["shelfId"] = frag.replace("_s:", "")
            break
          case /^_b:/.test(frag):
            props["bookId"] = frag.replace("_b:", "")
            break
          case /^_v:/.test(frag):
            props["version"] = frag.replace("_v:", "")
            break
          case /^_l:/.test(frag):
            props["language"] = frag.replace("_l:", "")
            break
          case /^_a:/.test(frag):
            props["articleId"] = frag.replace("_a:", "")
            break
          case /^_#:/.test(frag):
            props["section"] = frag.replace("_#:", "")
            break
        }
      })

      if (!!props["articleId"] && !!props["articleId"].length > 0) {
        return rootPath + props["shelfId"] + "/#" + props["bookId"]
      } else if (!!props["bookId"]) {
        return rootPath + props["shelfId"] + "/#" + props["bookId"]
      } else {
        return rootPath + props["shelfId"]
      }

    default:
      return href
  }
}

export const sourceNodes = async (gatsbyApi, pluginOptions) => {
  let {
    actions: { createParentChildLink },
  } = gatsbyApi

  let {
    deploymentId,
    language,
    path: _rootPath = "docs",
    versionId,
  } = pluginOptions

  let rootPath = "/" + _rootPath + "/"

  let mainNav = {
    id: "docsie-nav",
    items: [],
  }

  let data = await fetch(
    `https://app.docsie.io/api_v2/006/deployment/${deploymentId}/map/?expand=True`,
    ``
  )

  let htmlOptions = {
    entityStyleFn: (entity) => {
      const entityType = entity.get("type").toLowerCase()
      const data = entity.get("data")
      const _isDocsieLink = isDocsieLink.test(data.href)

      if (entityType === "link" && _isDocsieLink) {
        let href = preparehref(rootPath, data.href)
        return {
          element: "a",
          attributes: {
            href,
          },
        }
      } else {
        return entity
      }
    },
  }

  for (let doc of data) {
    let docPath = rootPath + doc.slug
    let d = nodeBuilder({
      gatsbyApi,
      type: "DocsieDoc",
      fields: {
        id: doc.id,
        name: doc.name,
        icon: doc.icon,
        order: doc.order,
        slug: docPath,
      },
      contentDigest: doc.modified,
    })

    let docNavItem = {
      id: "nav_item_" + doc.id,
      items: [],
      name: doc.name,
      order: doc.order,
      slug: docPath,
    }

    for (let book of doc.nodes) {
      let bookPath = docPath + "/" + book.slug
      let b = nodeBuilder({
        gatsbyApi,
        type: "DocsieBook",
        fields: {
          anchor: book.slug,
          id: book.id,
          name: book.name,
          order: book.order,
          slug: bookPath,
        },
        contentDigest: book.modified,
      })

      let bookNavItem = {
        id: book.slug,
        items: [],
        name: book.name,
        order: book.order,
        slug: bookPath,
        slugAsAnchor: docPath + "/#" + book.slug,
      }

      createParentChildLink({ parent: d, child: b })

      let selectedVersion = book.nodes.filter((v) => v.primary === true)[0]

      let selectedLanguage = !!versionId
        ? selectedVersion.nodes.filter(
            (l) => l.language.toLowerCase() === language.toLowerCase()
          )[0]
        : selectedVersion.nodes.filter((l) => l.primary === true)[0]

      for (let article of selectedLanguage.nodes) {
        let value = {
          blocks: article.doc.blocks,
          entityMap: article.doc.entityMap,
        }

        const convertedState = convertFromRaw(value)

        let html = stateToHTML(convertedState, htmlOptions)
        const articlePath = bookPath + "/" + article.slug

        let a = nodeBuilder({
          gatsbyApi,
          fields: {
            anchor: book.slug + "_" + article.slug,
            icon: article.doc.meta.icon,
            id: article.id,
            name: article.name,
            order: article.order,
            blocks: article.doc.blocks,
            html: html,
            slug: articlePath,
            version: article.doc.v,
          },
          contentDigest: article.modified,
          type: "DocsieArticle",
        })

        let articleNavItem = {
          id: "nav_item_" + article.id,
          name: article.name,
          order: article.order,
          slug: articlePath,
          slugAsHash: bookPath + "#" + article.slug,
        }
        createParentChildLink({ parent: b, child: a })

        bookNavItem.items.push(articleNavItem)
      }
      docNavItem.items.push(bookNavItem)
    }
    mainNav.items.push(docNavItem)
  }

  nodeBuilder({
    gatsbyApi,
    fields: {
      ...mainNav,
    },
    type: "DocsieNav",
  })
}

function nodeBuilder({ gatsbyApi, fields, type, contentDigest }) {
  const id = gatsbyApi.createNodeId(`${type}-${fields.id}`)
  const node = {
    ...fields,
    id: fields.id,
    internal: {
      type: type,
      contentDigest: gatsbyApi.createContentDigest(
        Date.parse(contentDigest).toString()
      ),
    },
  }
  gatsbyApi.actions.createNode(node)
  return node
}
