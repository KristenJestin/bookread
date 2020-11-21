// imports
import { BOOK_API_URL, BOOK_API_KEY } from '../config/env'

// exports
/**
 * Get all books matches with search value
 * @param query value of the search
 */
export const searchBooks = (query: string) =>
	fetch(
		`${BOOK_API_URL}/volumes?key=${BOOK_API_KEY}&q=${query}&orderBy=relevance`
	)
