import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import {
	Divider,
	Layout,
	LayoutElement,
	Spinner,
	Text,
} from '@ui-kitten/components'
import { Toolbar } from '../../components/toolbar.component'
import Book from '../../data/models/book.model'
import { BookSavedItemLayout } from '../../components/book-saved-item.component'
import Database from '../../config/database'
import { ReadingScreenProps } from '../../navigation/reading.navigator'
import { AppRoute } from '../../navigation/app-routes'

export const ReadingScreen = (props: ReadingScreenProps): LayoutElement => {
	const [loading, setLoading] = React.useState(true)
	const [books, setBooks] = React.useState<Book[]>([])

	React.useEffect(() => {
		;(async () => {
			const savedBooks = await Database.get(Book, (dbBooks) =>
				dbBooks.sorted('updatedAt', true)
			)
			setBooks(Array.from(savedBooks))
			setLoading(false)
		})()
	}, [])

	// navigate when click
	const navigateBookDetails = (book: Book): void => {
		props.navigation.navigate(AppRoute.BOOK_DETAILS, {
			bookKey: book.id,
		})
	}

	return (
		<React.Fragment>
			<Layout style={styles.container}>
				<Text style={styles.headerText} category="h1">
					Récent
				</Text>
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
	headerText: {},

	loadingContainer: {
		alignItems: 'center',
		marginTop: 20,
	},

	list: {
		marginTop: 30,
	},
})
