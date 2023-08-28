
## Description
This plugin adds Docsie content to your GatsbyJs website. It
can auto generate pages or you can query the graphql
yourself to have more control over page creation.

## How to Install

`npm install gastby-source-docsie` // todo, add to npm?

## How to Use 

    {
      resolve: require.resolve(`gatsby-source-docsie`),
      options: {
	  	deploymentId: "deployment_iigwE2dX4i7JVKmce", [required]
		generatePages: true, [optional, defaults to true]
		path: "docs", [optional, root path for slugs of all nodes, no slashes needed, defaults to docs]
		language: "English", [optional, if not provided defaults to primary language]
      }
    }


## With Page Generation
By default the plugin auto-generates pages. 

You can style the default pages using the following CSS classes:

- .docsie-main-container
- .docsie-nav-container
- .docsie-page-container
- .docsie-nav
- .docsie-nav-items
- .docise-nav-item


## Without Page Generation
If you need a little more control on how the content is generated, you can set `generatePages` above to `false`, and fetch the data directly from GatsbyJs using graphql. 

The plugin adds 4 graphql nodes to GatsbyJs:

- DociseDoc
- DociseBook
- DocsieArticle
- DocsieNav


You can find an example of how to generate pages in [/plugin/createPages.js](/plugin/createPages.js), and you can also look at [/plugin
/DocsieTemplate.js](/plugin/DocsieTemplate.js) for an example of how to build React components.


 




