import React from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import {
	Divider,
	Input,
	Layout,
	LayoutElement,
	Text,
} from '@ui-kitten/components'
import { Toolbar } from '../../components/toolbar.component'
import { SearchIcon } from '../../assets/icons'
import { searchBooks } from '../../services/books.service'
import { BookProps } from '../../data/book.helper'
import { BookItemLayout } from '../../components/book-item.component'
import { AppRoute } from '../../navigation/app-routes'
import { BooksScreenProps } from '../../navigation/books.navigator'

export const BooksScreen = (props: BooksScreenProps): LayoutElement => {
	const [books, setBooks] = React.useState<BookProps[]>([])
	const [search, setSearch] = React.useState('')

	// make request to get books from search
	React.useEffect(() => {
		;(async function () {
			try {
				const searchedBooks = await searchBooks(search)
				setBooks(searchedBooks)
			} catch (error) {
				Alert.alert(
					'Erreur',
					`Une erreur est survenue lors de la récupération des livres ${error}`
				)
			}
		})()
	}, [search])

	// navigate when click
	const navigateBookDetails = (bookIndex: number): void => {
		const { [bookIndex]: book } = books
		props.navigation.navigate(AppRoute.BOOK_DETAILS, { book })
	}

	return (
		<React.Fragment>
			<View>
				<Toolbar title="BOOKREAD" />
			</View>
			<Divider />
			<Layout style={styles.container}>
				<View style={styles.searchContainer}>
					<Input
						value={search}
						accessoryLeft={SearchIcon}
						placeholder="Rechercher un livre"
						onChangeText={(nextValue) => setSearch(nextValue)}
					/>
				</View>
				<Text
					style={styles.headerText}
					category="label"
					appearance="hint">
					Resultats
				</Text>
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
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},

	searchContainer: {
		marginBottom: 15,
	},

	headerText: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	list: {
		marginTop: 20,
	},
})
