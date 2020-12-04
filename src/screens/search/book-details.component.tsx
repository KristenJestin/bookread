import React from 'react'
import {
	StyleSheet,
	Image,
	View,
	ScrollView,
	Alert,
	FlatList,
} from 'react-native'
import { Layout, LayoutElement, Spinner, Text } from '@ui-kitten/components'
import Axios from 'axios'
import { BookProps } from '../../data/book.helper'
import { BooksDetailsScreenProps } from '../../navigation/search.navigator'
import { searchBooksFromAuthor } from '../../services/books.service'
import { BookItemSmallLayout } from '../../components/book-item-small.component'
import { AppRoute } from '../../navigation/app-routes'
import BackButton from '../../components/back-button.component'

export type BookDetailsRouteParams = {
	book: BookProps
}

export const BookDetailsScreen = (
	props: BooksDetailsScreenProps
): LayoutElement => {
	const { book } = props.route.params
	const [sameAuthorBooks, setSameAuthorBooks] = React.useState<BookProps[]>(
		[]
	)
	const [loading, setLoading] = React.useState(false)

	// make request to get books from author
	React.useEffect(() => {
		const source = Axios.CancelToken.source()
		;(async () => {
			try {
				if (!book.authors || !book.authors.length) return
				if (!loading) setLoading(true)

				const books = await searchBooksFromAuthor(
					book.authors[0],
					source
				)
				setSameAuthorBooks(
					books
						.filter(
							(sameBookAuthor) =>
								sameBookAuthor.id !== book.id &&
								sameBookAuthor.images &&
								sameBookAuthor.images.length
						)
						.sort(
							(a, b) =>
								new Date(b.publishedDate).getTime() -
								new Date(a.publishedDate).getTime()
						)
				)
				setLoading(false)
			} catch (error) {
				Alert.alert(
					'Erreur',
					`Une erreur est survenue lors de la récupération des livres ${error}`
				)
			}
		})()

		return () => {
			source.cancel()
		}
	}, [book]) // eslint-disable-line react-hooks/exhaustive-deps

	// navigate when click
	const navigateBookDetails = (bookIndex: number): void => {
		const { [bookIndex]: nextBook } = sameAuthorBooks
		props.navigation.navigate(AppRoute.BOOK_DETAILS, { book: nextBook })
	}

	// get image
	const image =
		book.images && book.images.length
			? book.images.find((img) => img.type === 'thumbnail') ||
			  book.images[0]
			: null

	return (
		<React.Fragment>
			<Layout style={styles.mainContainer}>
				<ScrollView>
					<Layout style={styles.container}>
						<BackButton onPress={props.navigation.goBack} />
						<View style={styles.bookContainer}>
							{image && (
								<Image
									style={styles.image}
									source={{
										uri: image.link,
									}}
								/>
							)}
							<Text category="h4" style={styles.title}>
								{book.title}
							</Text>
							{book.authors && book.authors.length && (
								<Text
									category="p2"
									appearance="hint"
									style={styles.subtitle}>
									par {book.authors.join(', ')}
									{book.publishedDate &&
										` • ${new Date(
											book.publishedDate
										).getFullYear()}`}
								</Text>
							)}
						</View>
						<View style={styles.infoContainer}>
							<Text
								style={styles.headerText}
								category="label"
								appearance="hint">
								Synopsis
							</Text>
							<Text category="p2">{book.description}</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text
								style={styles.headerText}
								category="label"
								appearance="hint">
								Catégories
							</Text>

							{book.categories && book.categories.length && (
								<Text>{book.categories.join(', ')}</Text>
							)}
						</View>
						<View style={styles.infoContainer}>
							<Text
								style={styles.headerText}
								category="label"
								appearance="hint">
								Livres de l'auteur
							</Text>
							{loading ? (
								<View style={styles.loadingContainer}>
									<Spinner />
								</View>
							) : (
								<FlatList
									horizontal
									style={styles.list}
									data={sameAuthorBooks}
									keyExtractor={(item) => item.id}
									renderItem={({ item, index }) => (
										<BookItemSmallLayout
											book={item}
											navigate={() =>
												navigateBookDetails(index)
											}
										/>
									)}
								/>
							)}
						</View>
					</Layout>
				</ScrollView>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	mainContainer: { flex: 1 },
	container: {
		flex: 1,
		padding: 20,
	},

	bookContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},

	loadingContainer: {
		alignItems: 'center',
		marginTop: 20,
	},

	image: {
		height: 200,
		// aspectRatio: 1 / 1.4,
		width: 150,
		resizeMode: 'cover',
		borderRadius: 12,
	},
	title: {
		marginTop: 15,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	subtitle: {
		textAlign: 'center',
	},

	infoContainer: {
		marginBottom: 25,
	},
	headerText: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},

	list: {
		marginTop: 10,
	},
})
