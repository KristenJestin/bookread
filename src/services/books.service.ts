import { BookImageProps } from '../data/book.helper'
// imports
import { BookProps } from '../data/book.helper'
import { BOOK_API_URL, BOOK_API_KEY } from '../config/env'

// exports
/**
 * Get all books matches with search value
 * @param query value of the search
 */
export const searchBooks = async (query: string): Promise<BookProps[]> => {
	const result = await fetch(
		`${BOOK_API_URL}/volumes?key=${BOOK_API_KEY}&q=${query}&orderBy=relevance`
	)
	const values = await result.json()
	const items: any[] = values?.items

	if (!items || items.length === 0) return []

	const books: (BookProps | null)[] = items.map((item): BookProps | null => {
		// get info
		const info = item.volumeInfo
		if (!info) return null

		let images: BookImageProps[] = []
		if (info.imageLinks)
			images = Object.keys(info.imageLinks).map(
				(key): BookImageProps => ({
					type: key,
					link: info.imageLinks[key],
				})
			)

		// return object
		return {
			id: item.id,
			etag: item.etag,

			title: info.title,
			authors: info.authors,
			publisher: info.publisher,
			publishedDate: info.publishedDate,
			description: info.description,
			identifiers: info.industryIdentifiers,
			pageCount: info.pageCount,
			categories: info.categories,
			images,
		}
	})

	return books.filter(
		(book: BookProps | null): book is BookProps =>
			book !== null && book !== undefined
	)
}

/**
 * Get books from author
 * @param author name of the author
 */
export const searchBooksFromAuthor = async (
	author: string
): Promise<BookProps[]> => await searchBooks(author)
