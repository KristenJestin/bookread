import Realm from 'realm'
import { DatedData, DatedProperties } from './default.model'
import { SessionData } from './session.model'

export interface ReadingData extends DatedData {
	id: string
	sessions: SessionData[]
	pages: number
	finishedAt?: Date
}

export default class Reading extends Realm.Object implements ReadingData {
	/** Getter for the class name */
	static get = (): string => Reading.schema.name

	/** Gets the model primary key of the session model */
	static primaryKey = (): string | undefined => Reading.schema.primaryKey

	/** Class (Realm) schema */
	static schema: Realm.ObjectSchema = {
		name: 'Reading',
		primaryKey: 'id',
		properties: {
			id: 'string',
			sessions: 'Session[]',
			pages: { type: 'int', default: 0 },
			finishedAt: 'date?',
			...DatedProperties,
		},
	}

	public id!: string
	public sessions!: SessionData[]
	public pages!: number
	public finishedAt?: Date
	public createdAt?: Date
	public updatedAt?: Date
}
