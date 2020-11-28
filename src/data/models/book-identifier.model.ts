import Realm from 'realm'

export interface BookIdentifierData {
	id: string
	name: string
	value: string
}

export default class BookIdentifier
	extends Realm.Object
	implements BookIdentifierData {
	/** Getter for the class name */
	static get = (): string => BookIdentifier.schema.name

	/** Gets the model primary key of the session model */
	static primaryKey = (): string | undefined =>
		BookIdentifier.schema.primaryKey

	/** Class (Realm) schema */
	static schema: Realm.ObjectSchema = {
		name: 'BookIdentifier',
		primaryKey: 'id',
		properties: {
			id: 'string',
			name: 'string',
			value: 'string',
		},
	}

	public id!: string
	public name!: string
	public value!: string
}
