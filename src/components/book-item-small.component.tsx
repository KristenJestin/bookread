import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Layout, LayoutElement, LayoutProps, Text } from '@ui-kitten/components'

import { BookProps } from '../data/book.helper'

interface BookItemSmallLayoutProps extends LayoutProps {
	book: BookProps
	navigate: () => void
}

export const BookItemSmallLayout = (
	props: BookItemSmallLayoutProps
): LayoutElement => {
	const { book, navigate } = props

	// get image
	const image =
		book.images && book.images.length
			? book.images.find((img) => img.type === 'thumbnail') ||
			  book.images[0]
			: null

	return (
		<Layout>
			<TouchableOpacity
				onPress={() => navigate()}
				style={styles.container}>
				{image && (
					<Image
						style={styles.image}
						source={{
							uri: image.link,
						}}
					/>
				)}
				<Text category="p2" style={styles.title}>
					{book.title}
				</Text>
			</TouchableOpacity>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		alignItems: 'center',
		maxWidth: 100,
	},

	image: {
		height: 120,
		aspectRatio: 1 / 1.4,
		backgroundColor: 'gray',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	title: {
		marginTop: 5,
		textAlign: 'center',
	},
})
