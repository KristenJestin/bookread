import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Layout, LayoutElement, Text } from '@ui-kitten/components'
import { Toolbar } from '../../components/toolbar.component'

export const BooksScreen = (): LayoutElement => {
	return (
		<React.Fragment>
			<View>
				<Toolbar title="BOOKREAD" />
			</View>
			<Divider />
			<Layout style={styles.container}>
				<Text
					style={styles.headerText}
					category="label"
					appearance="hint">
					Resultats
				</Text>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	headerText: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
})
