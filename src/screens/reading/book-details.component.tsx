import React from 'react'
import { StyleSheet, Image, View, ScrollView } from 'react-native'
import {
	Layout,
	LayoutElement,
	Spinner,
	Text,
	Button,
} from '@ui-kitten/components'
import { BookSavedDetailsScreenProps } from '../../navigation/reading.navigator'
import Book from '../../data/models/book.model'
import Database from '../../config/database'
import BackButton from '../../components/back-button.component'
import { ReadingData } from '../../data/models/reading.model'
import { generateModelId } from '../../data/models/default.model'
import { ReadingDetailsLayout } from '../../components/reading/reading-details.component'

export type BookSavedDetailsRouteParams = {
	bookKey: string
}

export const BookSavedDetailsScreen = (
	props: BookSavedDetailsScreenProps
): LayoutElement => {
	const { bookKey } = props.route.params
	const [book, setBook] = React.useState<Book>()
	const [update, setUpdate] = React.useState(false)

	React.useMemo(() => {
		;(async () => {
			setBook(await Database.find(Book, bookKey))
		})()
	}, [bookKey])

	if (!book) {
		return (
			<React.Fragment>
				<Layout style={styles.loadingContainer}>
					<BackButton onPress={props.navigation.goBack} />
					<Spinner />
				</Layout>
			</React.Fragment>
		)
	}

	const startReading = async () => {
		await Database.query(() => {
			const reading: ReadingData = {
				id: generateModelId(),
				sessions: [],
				pages: 0,
			}
			book.currentReading = reading
		})
		setUpdate((previousUpdate) => !previousUpdate)
	}

	return (
		<React.Fragment>
			<Layout style={styles.mainContainer}>
				<ScrollView>
					<View style={styles.coverContainer}>
						<Image
							style={styles.coverImage}
							source={{
								uri: book.image,
							}}
						/>
						<BackButton onPress={props.navigation.goBack} />
						<Text category="p1" style={styles.title}>
							{book.title}
						</Text>
						<Text
							category="s2"
							appearance="hint"
							style={styles.subtitle}>
							{book.getSubtitle()}
						</Text>
					</View>
					<Layout style={styles.container}>
						<View style={styles.infoContainer}>
							<Text
								style={styles.headerText}
								category="label"
								appearance="hint">
								Lecture
							</Text>
							<View style={styles.readingContainer}>
								{book.currentReading ? (
									<ReadingDetailsLayout
										reading={book.currentReading}
										pages={book.pages}
									/>
								) : (
									<Button
										status="success"
										onPress={startReading}>
										COMMENCER À LIRE
									</Button>
								)}
							</View>
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
								<Text category="p2">
									{book.categories.join(', ')}
								</Text>
							)}
						</View>
					</Layout>
				</ScrollView>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	coverContainer: {
		width: '100%',
		height: 200,
		justifyContent: 'center',
	},
	coverImage: {
		height: '100%',
		width: '100%',
		resizeMode: 'cover',
		opacity: 0.12,
		position: 'absolute',
	},

	container: {
		flex: 1,
		paddingVertical: 10,
	},

	readingContainer: {
		marginTop: 10,
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
		fontSize: 28,
		textAlign: 'center',
	},
	subtitle: {
		textAlign: 'center',
	},

	infoContainer: {
		marginBottom: 25,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	headerText: {
		textTransform: 'uppercase',
	},

	list: {
		marginTop: 10,
	},
})
