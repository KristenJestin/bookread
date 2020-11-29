import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import {
	Button,
	Layout,
	LayoutElement,
	LayoutProps,
	Text,
} from '@ui-kitten/components'

import Book from '../data/models/book.model'
import { GoIcon } from '../assets/icons'

interface BookSavedItemLayoutProps extends LayoutProps {
	book: Book
	navigate: () => void
}

export const BookSavedItemLayout = (
	props: BookSavedItemLayoutProps
): LayoutElement => {
	const { book, navigate } = props
	return (
		<Layout style={styles.container}>
			{book.image && (
				<Image
					style={styles.image}
					source={{
						uri: book.image,
					}}
				/>
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

const styles = StyleSheet.create({
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

	image: {
		height: 150,
		aspectRatio: 1 / 1.4,
		backgroundColor: 'gray',
		resizeMode: 'cover',
		borderRadius: 12,
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
