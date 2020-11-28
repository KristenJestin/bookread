// imports
import Realm from 'realm'
import 'react-native-get-random-values'
import { v1 as uuid } from 'uuid'
import Book from '../data/models/book.model'
import BookIdentifier from '../data/models/book-identifier.model'

// exports
export default class Database {
	private static db: Realm

	public static setupConnection = async () => {
		const options = {
			schema: [Book, BookIdentifier],
			schemaVersion: 2,
		}

		Database.db = await Realm.open(options)
		console.info('DATABASE : connection opened')
	}

	public static closeConnection = () => {
		if (Database.db !== null && !Database.db.isClosed) {
			Database.db.close()
			console.info('DATABASE : connection closed')
		}
	}

	public static getConnection = (): Realm => Database.db

	public static generateId = (): string => uuid()

	public static insert = <T extends Realm.Object>(
		type: { new (...arg: any[]): T },
		properties: RealmInsertionModel<T>
	): Promise<T> =>
		new Promise((resolve) => {
			Database.getConnection().write(() => {
				const newData = Database.getConnection().create<T>(
					type,
					properties,
					Realm.UpdateMode.Never
				)
				resolve(newData)
			})
		})

	public static insertOrUpdate = <T extends Realm.Object>(
		type: { new (...arg: any[]): T },
		properties: Partial<RealmInsertionModel<T>>,
		mode: Realm.UpdateMode.All | Realm.UpdateMode.Modified
	): Promise<T> =>
		new Promise<T>((resolve) => {
			Database.getConnection().write(() => {
				const newData = Database.getConnection().create<T>(
					type,
					properties,
					mode
				)
				resolve(newData)
			})
		})

	public static find = <T extends Realm.Object>(
		type: { new (...arg: any[]): T },
		key: number | string | Realm.ObjectId
	): Promise<T | undefined> =>
		new Promise((resolve) => {
			resolve(Database.getConnection().objectForPrimaryKey<T>(type, key))
		})

	public static get = <T extends Realm.Object>(type: {
		new (...arg: any[]): T
	}): Promise<Realm.Results<T & Realm.Object>> =>
		new Promise((resolve) => {
			resolve(Database.getConnection().objects<T>(type))
		})
}
