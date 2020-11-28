// imports
import 'react-native-get-random-values'
import { v1 as uuid } from 'uuid'

// exports
export interface DatedData {
	createdAt: Date
	updatedAt: Date
}

export const generateModelId = (): string => uuid()
