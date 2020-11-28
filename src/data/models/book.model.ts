import Realm from 'realm'
import BookIdentifier, { BookIdentifierData } from './book-identifier.model'
import { DatedData, generateModelId } from './default.model'
import { BookProps } from '../book.helper'

export interface BookData extends DatedData {
	id: string
	googleId: string
	etag: string
	title: string
	authors: string[]
	publisher: string
	publishedAt?: Date
	description: string
	identifiers: BookIdentifierData[]
	pageCount: number
	categories: string[]
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
			googleId: 'string',
			etag: 'string',
			title: 'string',
			authors: 'string[]',
			publisher: 'string?',
			publishedAt: { type: 'date', optional: true },
			description: 'string?',
			identifiers: 'BookIdentifier[]',
			pageCount: { type: 'int', default: 0 },
			categories: 'string[]',
			image: 'string?',
			createdAt: { type: 'date', default: new Date() },
			updatedAt: { type: 'date', default: new Date() },
		},
	}

	public id!: string
	public googleId!: string
	public etag!: string
	public title!: string
	public authors!: string[]
	public publisher!: string
	public publishedAt?: Date
	public description!: string
	public identifiers!: BookIdentifierData[]
	public pageCount!: number
	public categories!: string[]
	public image!: string
	public createdAt!: Date
	public updatedAt!: Date

	static BuildFromHelper = (bookProps: BookProps): BookData => {
		const book: BookData = {
			id: generateModelId(),
			googleId: bookProps.id,
			etag: bookProps.etag,
			title: bookProps.title,
			authors: bookProps.authors,
			publisher: bookProps.publisher,
			publishedAt: bookProps.publishedDate
				? new Date(bookProps.publishedDate)
				: undefined,
			description: bookProps.description,
			identifiers: bookProps.identifiers.map((identifier) =>
				BookIdentifier.BuildFromHelper(identifier)
			),
			pageCount: bookProps.pageCount,
			categories: bookProps.categories,
			image: (
				bookProps.images.find((image) => image.type === 'thumbnail') ??
				bookProps.images[0]
			)?.link,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		return book
	}
}
