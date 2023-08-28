import React from "react"
import { Link } from "gatsby"

const DocsieNav = (props) => {
  let navItems = props.nav.nodes.map((n) => {
    return (
      <ul className="docise-nav-items">
        {n.items.map((doc) => {
          return (
            <li key={doc.id} className="docise-nav-item">
              <Link to={doc.slug} onClick={(e) => props.setMenu((_) => doc.id)}>
                {doc.name}
              </Link>
              {!!doc.items.length && props.selectedMenu === doc.id && (
                <ul className="docsie-nav-items">
                  {doc.items.map((book) => {
                    return (
                      <li
                        className="docsie-nav-item"
                        onClick={(e) => props.setMenu((_) => doc.id)}
                        key={book.id}>
                        <Link to={book.slugAsAnchor}>{book.name}</Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    )
  })
  return <div>{navItems.map((item) => item)}</div>
}

function Docsie(props) {
  const { childrenDocsieBook, id, nav } = props.pageContext
  const [selectedMenu, setMenu] = React.useState("nav_item_" + id)

  return (
    <div className="docsie-main-container">
      <div className="docsie-nav-container">
        <DocsieNav nav={nav} selectedMenu={selectedMenu} setMenu={setMenu} />
      </div>
      <div className="docsie-page-container">
        {childrenDocsieBook.map((book) => {
          return (
            <>
              <h2 id={book.anchor} key={book.id}>
                {book.name}
              </h2>
              {book.childrenDocsieArticle.map((article) => {
                return (
                  <span
                    dangerouslySetInnerHTML={{ __html: article.html }}
                    id={article.anchor}
                    key={article.id}
                  />
                )
              })}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Docsie
