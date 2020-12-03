import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Layout, LayoutElement, Spinner, Text } from '@ui-kitten/components'
import Book from '../../data/models/book.model'
import { BookSavedItemLayout } from '../../components/book-saved-item.component'
import Database from '../../config/database'
import { BooksScreenProps } from '../../navigation/books-list.navigator'
import { AppRoute } from '../../navigation/app-routes'

export const BooksScreen = (props: BooksScreenProps): LayoutElement => {
	const [loading, setLoading] = React.useState(true)
	const [books, setBooks] = React.useState<Book[]>([])
	const [, setUpdate] = React.useState(false)

	// get all books with books
	React.useEffect(() => {
		;(async () => {
			const savedBooks = await Database.get(Book, (dbBooks) =>
				dbBooks.sorted('updatedAt', true)
			)
			setBooks(Array.from(savedBooks))
			setLoading(false)
		})()
	}, [])

	// event on navigation go back here
	React.useEffect(() => {
		const updateAction = () => {
			setUpdate((upd) => !upd)
			return true
		}
		props.navigation.addListener('focus', updateAction)

		return () => props.navigation.removeListener('focus', updateAction)
	}, [props.navigation])

	// navigate when click
	const navigateBookDetails = (book: Book): void => {
		props.navigation.navigate(AppRoute.BOOK_DETAILS, {
			bookKey: book.id,
		})
	}

	return (
		<React.Fragment>
			<Layout style={styles.container}>
				<Text category="h1">Livres</Text>
				{loading ? (
					<View style={styles.loadingContainer}>
						<Spinner />
					</View>
				) : (
					<FlatList
						style={styles.list}
						data={books}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<BookSavedItemLayout
								book={item}
								navigate={() => navigateBookDetails(item)}
							/>
						)}
					/>
				)}
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},

	loadingContainer: {
		alignItems: 'center',
		marginTop: 20,
	},

	list: {
		marginTop: 30,
	},
})
