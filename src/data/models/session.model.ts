import Realm from 'realm'

export interface SessionData {
	id: string
	startedAt: Date
	duration: number
	pages: number
	note?: string
}

export default class Session extends Realm.Object implements SessionData {
	/** Getter for the class name */
	static get = (): string => Session.schema.name

	/** Gets the model primary key of the session model */
	static primaryKey = (): string | undefined => Session.schema.primaryKey

	/** Class (Realm) schema */
	static schema: Realm.ObjectSchema = {
		name: 'Session',
		primaryKey: 'id',
		properties: {
			id: 'string',
			startedAt: 'date',
			duration: 'int',
			pages: 'int',
			note: 'string?',
		},
	}

	public id!: string
	public startedAt!: Date
	public duration!: number
	public pages!: number
	public note?: string
}
