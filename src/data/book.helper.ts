export type BookIdentifierProps = {
	id: string
	type: string
}
export type BookImageProps = {
	type: string
	link: string
}

export type BookProps = {
	id: string
	etag: string

	title: string
	authors: string[]
	publisher: string
	publishedDate: Date
	description: string
	identifiers: BookIdentifierProps[]
	pageCount: number
	categories: string[]
	images: BookImageProps[]
}
