export default createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
		type DocsieDoc implements Node {
			children: [ID!]
        	id: ID! 
			name: string
			order: int
			icon: string
      	}

		type DocsieBook implements Node {
			anchor: string
			id: ID!
			name: string
			order: int
			slug: string
		}
		
		type NavItem {
			id: ID!
			name: string
			order: int
			slug: string
			slugAsAnchor: string
		}

		type DoscieNav implements Node {
			id: ID!
			items: [NavItem]	
		}

		type InlineStyleRange {
  			offset: Int
		  	length: Int
		  	style: String
		}

		input InlineStyleRangeInput {
		  offset: Int
		  length: Int
		  style: String
		}

		type EntityRange {
		  offset: Int
		  length: Int
		  key: Int
		}

		input EntityRangeInput {
		  	offset: Int
		  	length: Int
		  	key: Int
		}

		type Data {
			id: String
		}

		input DataInput {
		  	id: String
		}

		type Block {
			key: String
		  	text: String
		  	type: String
		  	depth: Int
		  	inlineStyleRanges: [InlineStyleRange]
		  	entityRanges: [EntityRange]
		  	data: Data
		}

		input BlockInput {
		  	key: String
		  	text: String
		  	type: String
		  	depth: Int
		  	inlineStyleRanges: [InlineStyleRangeInput]
		  	entityRanges: [EntityRangeInput]
		  	data: DataInput
		}

		type LinkData {
			type: String
		  	href: String
		  	target: String
		}

		type EmbedData {
			type: String
		  	url: String
		  	html: String
		}

		union EntityData = LinkData | EmbedData

		input EntityDataInput {
			type: String!
		  	# EMBED fields
		  	url: String
		  	html: String
		  	# LINK fields
		  	href: String
		  	target: String
		}

		enum EntityType {
		  LINK
		  TOKEN
		  PHOTO
		  IMAGE
		  EMBED
		}

		enum EntityMutability {
		  MUTABLE
		  IMMUTABLE
		  SEGMENTED
		}

		type Entity {
		  type: EntityType
		  mutability: EntityMutability
		  data: EntityData
		}

		input EntityInput {
		  type: EntityType
		  mutability: EntityMutability
		  data: EntityDataInput
		}

		type DocsieArticle implements Node {
			anchor: string
			html: string
			icon: string
			id: ID!
			blocks: [Block] 
			entityMap: [Entity]
			name: string
			order: int
			slug: string
			version: int
		}
    `)
}
