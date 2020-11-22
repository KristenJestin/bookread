import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Divider, Layout, LayoutElement, Text } from '@ui-kitten/components'
import { BookProps } from '../../data/book.helper'
import { BooksDetailsScreenProps } from '../../navigation/books.navigator'
import { Toolbar } from '../../components/toolbar.component'

export type BookDetailsRouteParams = {
	book: BookProps
}

export const BookDetailsScreen = (
	props: BooksDetailsScreenProps
): LayoutElement => {
	const { book } = props.route.params

	// get image
	const image =
		book.images && book.images.length
			? book.images.find((img) => img.type === 'thumbnail') ||
			  book.images[0]
			: null

	return (
		<React.Fragment>
			<View>
				<Toolbar
					title="BOOKREAD"
					onBackPress={props.navigation.goBack}
				/>
			</View>
			<Divider />
			<Layout style={styles.container}>
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
							{book.authors.join(', ')}
						</Text>
					)}
				</View>
				<View style={styles.infoContainer}>
					<Text
						style={styles.headerText}
						category="label"
						appearance="hint">
						Description
					</Text>
					<Text>{book.description}</Text>
				</View>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},

	bookContainer: {
		alignItems: 'center',
		marginTop: 10,
	},

	image: {
		height: 250,
		aspectRatio: 1 / 1.4,
		backgroundColor: 'gray',
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
		marginTop: 25,
	},
	headerText: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
})
