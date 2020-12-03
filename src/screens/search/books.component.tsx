import React from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import {
	Input,
	Layout,
	LayoutElement,
	Spinner,
	Text,
} from '@ui-kitten/components'
import Axios from 'axios'
import { SearchIcon } from '../../assets/icons'
import { searchBooks } from '../../services/books.service'
import { BookProps } from '../../data/book.helper'
import { BookItemLayout } from '../../components/book-item.component'
import { AppRoute } from '../../navigation/app-routes'
import { BooksScreenProps } from '../../navigation/books-list.navigator'

export const BooksScreen = (props: BooksScreenProps): LayoutElement => {
	const [books, setBooks] = React.useState<BookProps[]>([])
	const [loading, setLoading] = React.useState(false)
	const [search, setSearch] = React.useState('')

	// make request to get books from search
	React.useEffect(() => {
		const source = Axios.CancelToken.source()
		;(async () => {
			try {
				if (search === '') return

				if (!loading) setLoading(true)

				const searchedBooks = await searchBooks(search, source)
				setBooks(searchedBooks)
				setLoading(false)
			} catch (error) {
				if (!Axios.isCancel(error))
					Alert.alert(
						'Erreur',
						`Une erreur est survenue lors de la récupération des livres ${JSON.stringify(
							error.response.data
						)}`
					)
			}
		})()
		return () => {
			source.cancel()
		}
	}, [search]) // eslint-disable-line react-hooks/exhaustive-deps

	// navigate when click
	const navigateBookDetails = (bookIndex: number): void => {
		const { [bookIndex]: book } = books
		props.navigation.navigate(AppRoute.BOOK_DETAILS, { book })
	}

	return (
		<React.Fragment>
			<Layout style={styles.container}>
				<Text style={styles.headerText} category="h1">
					Recherche
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
						renderItem={({ item, index }) => (
							<BookItemLayout
								book={item}
								navigate={() => navigateBookDetails(index)}
							/>
						)}
					/>
				)}
				<View style={styles.searchContainer}>
					<Input
						value={search}
						accessoryLeft={SearchIcon}
						placeholder="Rechercher un livre"
						onChangeText={(nextValue) => setSearch(nextValue)}
					/>
				</View>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerText: {
		padding: 20,
	},
	list: {
		padding: 20,
		// marginTop: 30,
		// marginBottom: 15,
	},

	loadingContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	searchContainer: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
})
