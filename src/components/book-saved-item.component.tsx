import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import {
	Button,
	Layout,
	LayoutElement,
	LayoutProps,
	StyleService,
	Text,
	useStyleSheet,
} from '@ui-kitten/components'

import Book from '../data/models/book.model'

interface BookSavedItemLayoutProps extends LayoutProps {
	book: Book
	navigate: () => void
}

export const BookSavedItemLayout = (
	props: BookSavedItemLayoutProps
): LayoutElement => {
	const styles = useStyleSheet(themedStyle)
	const { book, navigate } = props

	const renderProgress = () => {
		if (book.currentReading) {
			const progress =
				Math.round(
					(((book.currentReading?.pages || 0) * 100) / book.pages) *
						10
				) / 10
			return (
				<View style={styles.progressContainer}>
					<View
						style={[styles.progress, { width: `${progress}%` }]}
					/>
				</View>
			)
		}

		return null
	}

	return (
		<Layout style={styles.container}>
			{book.image && (
				<View style={styles.coverContainer}>
					<Image
						style={reactStyles.image}
						source={{
							uri: book.image,
						}}
					/>
					{renderProgress()}
				</View>
			)}
			<View style={styles.info}>
				<View style={styles.texts}>
					<Text
						style={styles.title}
						category="p1"
						numberOfLines={1}
						ellipsizeMode="tail">
						{book.title}
					</Text>
					{book.authors && book.authors.length && (
						<Text
							style={styles.subtitle}
							category="c2"
							appearance="hint"
							numberOfLines={1}
							ellipsizeMode="tail">
							par {book.authors?.join(', ')}
						</Text>
					)}
					{book.publishedAt && (
						<Text category="label" appearance="hint">
							({book.publishedAt.getFullYear()})
						</Text>
					)}
				</View>
				<Button
					style={styles.button}
					// accessoryRight={GoIcon}
					appearance="outline"
					onPress={() => navigate()}
					size="small">
					AFFICHER LE LIVRE
				</Button>
			</View>
		</Layout>
	)
}

const reactStyles = StyleSheet.create({
	image: {
		height: 150,
		aspectRatio: 1 / 1.4,
		backgroundColor: 'gray',
		resizeMode: 'cover',
	},
})

const themedStyle = StyleService.create({
	container: {
		height: 150,
		flexDirection: 'row',
		marginBottom: 20,
	},
	info: {
		flexGrow: 1,
		width: 0,
		margin: 10,
		justifyContent: 'space-between',
	},
	texts: {},

	coverContainer: {
		overflow: 'hidden',
		borderRadius: 12,
	},
	progressContainer: {
		height: 6,
		borderRadius: 3,
		backgroundColor: 'background-basic-color-2',
		overflow: 'hidden',
		opacity: 0.7,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	progress: {
		flex: 1,
		backgroundColor: 'color-primary-default',
	},

	title: {
		// fontWeight: '700',
	},
	subtitle: {},
	description: {
		marginTop: 12,
	},
	button: { borderRadius: 60 },
})
