import React from 'react'
import { View } from 'react-native'
import {
	Layout,
	LayoutElement,
	LayoutProps,
	Text,
	StyleService,
	useStyleSheet,
	Button,
} from '@ui-kitten/components'
import { ReadingData } from '../../data/models/reading.model'

interface ReadingDetailsLayoutProps extends LayoutProps {
	reading: ReadingData
	pages: number
}

export const ReadingDetailsLayout = (
	props: ReadingDetailsLayoutProps
): LayoutElement => {
	const styles = useStyleSheet(themedStyle)
	const { reading, pages } = props

	const progress = Math.round(((reading.pages * 100) / pages) * 10) / 10

	return (
		<Layout style={styles.container}>
			<View style={styles.textsContainer}>
				<View style={styles.pagesContainer}>
					<Text category="p1" style={styles.currentPage}>
						{reading.pages}
					</Text>
					<Text category="p2"> / </Text>
					<Text category="p2">{pages}</Text>
				</View>
				<View>
					<Text category="s2" appearance="hint">
						{progress}%
					</Text>
				</View>
			</View>
			<View style={styles.progressContainer}>
				<View style={[styles.progress, { width: `${progress}%` }]} />
			</View>
			<Button style={styles.newSession}>
				Nouvelle session de lecture
			</Button>
		</Layout>
	)
}

const themedStyle = StyleService.create({
	container: {
		flexDirection: 'column',
	},
	textsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 2,
	},
	pagesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	currentPage: {
		fontSize: 28,
		color: 'color-primary-default',
	},

	progressContainer: {
		height: 6,
		borderRadius: 3,
		backgroundColor: 'background-basic-color-2',
		overflow: 'hidden',
		marginBottom: 20,
	},
	progress: {
		flex: 1,
		backgroundColor: 'color-primary-default',
	},

	newSession: {},
})
