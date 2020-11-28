import Realm from 'realm'
import BookIdentifier from './book-identifier.model'

export interface BookData {
	id: string
	etag: string
	title: string
	authors: string
	publisher: string
	publishedDate: string
	description: string
	identifiers: BookIdentifier[]
	pageCount: number
	categories: string
	image: string
}

export default class Book extends Realm.Object implements BookData {
	/** Getter for the class name */
	static get = (): string => BookIdentifier.schema.name

	/** Gets the model primary key of the session model */
	static primaryKey = (): string | undefined =>
		BookIdentifier.schema.primaryKey

	/** Class (Realm) schema */
	static schema: Realm.ObjectSchema = {
		name: 'Book',
		primaryKey: 'id',
		properties: {
			id: 'string',
			etag: 'string',
			title: 'string',
			authors: 'string[]',
			publisher: 'string',
			publishedDate: 'string',
			description: 'string',
			identifiers: 'BookIdentifier[]',
			pageCount: 'int',
			categories: 'string[]',
			image: 'string',
		},
	}

	public id!: string
	public etag!: string
	public title!: string
	public authors!: string
	public publisher!: string
	public publishedDate!: string
	public description!: string
	public identifiers!: BookIdentifier[]
	public pageCount!: number
	public categories!: string
	public image!: string
}
