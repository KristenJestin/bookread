// imports
import { BookProps } from '../data/book.helper'
import { BookImageProps } from '../data/book.helper'
import axios from '../config/axios.config'
import { CancelTokenSource } from 'axios'

// exports

export type BookServiceProps = {
	langRestrict?: string
	maxResults?: number
	orderBy?: 'newest' | 'relevance'
	projection?: 'full' | 'lite'
	showPreorders?: Boolean
	startIndex?: number
}

/**
 * Get all books matches with search value
 * @param query value of the search
 */
export const searchBooks = async (
	query: string,
	cancelationSource: CancelTokenSource,
	options: BookServiceProps = {}
): Promise<BookProps[]> => {
	const response = await axios.get('volumes', {
		params: {
			q: query,
			...options,
		},
		cancelToken: cancelationSource.token,
	})

	const values = response.data
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
	author: string,
	cancelationSource: CancelTokenSource
): Promise<BookProps[]> =>
	await searchBooks(`inauthor:${author}`, cancelationSource, {
		orderBy: 'newest',
		maxResults: 5,
	})
