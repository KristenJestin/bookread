import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import {
	Button,
	Layout,
	LayoutElement,
	LayoutProps,
	Text,
} from '@ui-kitten/components'

import { BookProps } from '../data/book.helper'
import { GoIcon } from '../assets/icons'

interface BookItemLayoutProps extends LayoutProps {
	book: BookProps
	navigate: () => void
}

export const BookItemLayout = (props: BookItemLayoutProps): LayoutElement => {
	const { book, navigate } = props

	// get image
	const image =
		book.images && book.images.length
			? book.images.find((img) => img.type === 'thumbnail') ||
			  book.images[0]
			: null

	return (
		<Layout style={styles.container}>
			{image && (
				<Image
					style={styles.image}
					source={{
						uri: image.link,
					}}
				/>
			)}
			<View style={styles.info}>
				<View style={styles.texts}>
					<Text
						style={styles.title}
						category="h6"
						numberOfLines={1}
						ellipsizeMode="tail">
						{book.title}
					</Text>
					{book.authors && book.authors.length && (
						<Text
							style={styles.subtitle}
							appearance="hint"
							numberOfLines={1}
							ellipsizeMode="tail">
							par {book.authors?.join(', ')}
						</Text>
					)}
					{book.publishedDate && (
						<Text category="label" appearance="hint">
							({new Date(book.publishedDate).getFullYear()})
						</Text>
					)}
					{book.description && (
						<Text
							style={styles.description}
							numberOfLines={2}
							ellipsizeMode="tail"
							category="p2">
							{book.description}
						</Text>
					)}
				</View>
				<Button
					style={styles.button}
					accessoryRight={GoIcon}
					appearance="ghost"
					onPress={() => navigate()}
					size="small">
					Afficher le livre
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

	title: {},
	subtitle: {},
	description: {
		marginTop: 12,
	},
	button: {},
})
