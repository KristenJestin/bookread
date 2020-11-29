import React from 'react'
import { StyleSheet, Image, View, ScrollView } from 'react-native'
import {
	Divider,
	Layout,
	LayoutElement,
	Spinner,
	Text,
} from '@ui-kitten/components'
import { BookSavedDetailsScreenProps } from '../../navigation/reading.navigator'
import { Toolbar } from '../../components/toolbar.component'
import Book from '../../data/models/book.model'
import Database from '../../config/database'

export type BookSavedDetailsRouteParams = {
	bookKey: string
}

export const BookSavedDetailsScreen = (
	props: BookSavedDetailsScreenProps
): LayoutElement => {
	const { bookKey } = props.route.params
	const [book, setBook] = React.useState<Book>()

	React.useMemo(() => {
		;(async () => {
			setBook(await Database.find(Book, bookKey))
		})()
	}, [bookKey])

	if (!book) {
		return (
			<React.Fragment>
				<View>
					<Toolbar
						title="Détails"
						onBackPress={props.navigation.goBack}
					/>
				</View>
				<Divider />
				<Layout style={styles.loadingContainer}>
					<Spinner />
				</Layout>
			</React.Fragment>
		)
	}

	const subtitle = (): string => {
		let result = ''
		if (book.authors && book.authors.length)
			result += `par ${book.authors?.join(', ')}`

		if (book.publishedAt) {
			if (result !== '') result += ' • '
			result += book.publishedAt.getFullYear()
		}

		return result
	}

	return (
		<React.Fragment>
			<View>
				<Toolbar
					title="Détails"
					onBackPress={props.navigation.goBack}
				/>
			</View>
			<Divider />
			<Layout style={styles.mainContainer}>
				<ScrollView>
					<View
						style={{
							width: '100%',
							height: 200,
							justifyContent: 'center',
						}}>
						<Text category="h4" style={styles.title}>
							{book.title}
						</Text>
						<Text
							category="p2"
							appearance="hint"
							style={styles.subtitle}>
							{subtitle()}
						</Text>
						<Image
							style={{
								height: '100%',
								width: '100%',
								resizeMode: 'cover',
								opacity: 0.12,
								position: 'absolute',
							}}
							source={{
								uri: book.image,
							}}
						/>
					</View>
					<Layout style={styles.container}>
						<View style={styles.infoContainer}>
							<Text
								style={styles.headerText}
								category="label"
								appearance="hint">
								Description
							</Text>
							<Text>{book.description}</Text>
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
		flex: 1,
		justifyContent: 'center',
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
