import path from "path"

export const createPages = async ({ graphql, actions }, pluginOptions) => {
  const { createPage } = actions

  const { generatePages } = pluginOptions

  if (generatePages) {
    const queryResults = await graphql(`
      query AllDocsieDoc {
        allDocsieNav {
          nodes {
            id
            items {
              id
              order
              name
              slug
              items {
                id
                name
                order
                slug
                slugAsAnchor
                items {
                  id
                  name
                  order
                  slug
                }
              }
            }
          }
        }
        allDocsieDoc {
          nodes {
            slug
            id
            name
            order
            childrenDocsieBook {
              anchor
              name
              order
              id
              slug
              childrenDocsieArticle {
                html
                icon
                id
                name
                order
                slug
              }
            }
          }
        }
      }
    `)

    const docTemplate = path.resolve(__dirname, `./DocsieTemplate.js`)

    queryResults.data.allDocsieDoc.nodes.forEach((node) => {
      createPage({
        path: `${node.slug}`,
        component: docTemplate,
        context: {
          ...node,
          slug: `${node.slug}`,
          nav: queryResults.data.allDocsieNav,
        },
      })
    })
  }
}
