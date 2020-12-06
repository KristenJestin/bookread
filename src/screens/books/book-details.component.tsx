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
import { AppRoute } from '../../navigation/app-routes'
import { EditIcon } from '../../assets/icons'

export type BookSavedDetailsRouteParams = {
	bookKey: string
}

export const BookSavedDetailsScreen = (
	props: BookSavedDetailsScreenProps
): LayoutElement => {
	const { bookKey } = props.route.params
	const [book, setBook] = React.useState<Book>()
	const [, setUpdate] = React.useState(false)

	// find book from sended key
	React.useMemo(() => {
		;(async () => {
			setBook(await Database.find(Book, bookKey))
		})()
	}, [bookKey])

	// event on navigation go back here
	React.useEffect(() => {
		const updateAction = () => {
			setUpdate((upd) => !upd)
			return true
		}
		props.navigation.addListener('focus', updateAction)

		return () => props.navigation.removeListener('focus', updateAction)
	}, [props.navigation])

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

	// function to add 'reading' part in book
	const startReading = async () => {
		await Database.query(() => {
			const reading: ReadingData = {
				id: generateModelId(),
				sessions: [],
				pages: 0,
			}
			book.currentReading = reading
			book.updatedAt = new Date()
		})
		setUpdate((previousUpdate) => !previousUpdate)
	}

	// navigation to new session page
	const navigateSession = async () => {
		props.navigation.navigate(AppRoute.BOOK_SESSION, {
			bookTitle: book.title,
			bookPages: book.pages,
			bookCurrentPage: book.currentReading?.pages,
			bookId: book.id,
		})
	}

	// navigation to edition page
	const navigateEdit = async () => {
		props.navigation.navigate(AppRoute.BOOK_EDIT, {
			bookKey: book.id,
		})
	}

	return (
		<React.Fragment>
			<Layout style={styles.mainContainer}>
				<ScrollView>
					<View style={styles.coverContainer}>
						{book.image && (
							<Image
								style={styles.coverImage}
								source={{
									uri: book.image,
								}}
							/>
						)}
						<BackButton onPress={props.navigation.goBack} />
						<Text category="p1" style={styles.title}>
							{book.title}
						</Text>
						<Text
							category="s2"
							appearance="hint"
							style={styles.subtitle}>
							{Book.getSubtitle(book)}
						</Text>
						<Button
							style={styles.editButton}
							appearance="ghost"
							status="basic"
							accessoryLeft={EditIcon}
							onPress={navigateEdit}
						/>
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
										onPressSession={navigateSession}
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
							{book.categories && (
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
	editButton: {
		position: 'absolute',
		// backgroundColor: 'red',
		bottom: 5,
		right: 15,
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
