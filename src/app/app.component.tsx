import React from 'react'
import {
	ApplicationProvider,
	IconRegistry,
	Layout,
	Spinner,
	Text,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { theme, mapping, navigatorTheme } from './app-theming'
import { HomeNavigator } from '../navigation/home.navigator'
import Database from '../config/database'
import { StyleSheet } from 'react-native'

export default (): React.ReactElement => {
	const [initialized, setInitialized] = React.useState(false)

	React.useEffect(() => {
		;(async () => {
			// TODO: add  try/catch
			await Database.setupConnection()
			setInitialized(true)
		})()

		return () => {
			Database.closeConnection()
			setInitialized(false)
		}
	}, [])

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider
				{...eva}
				theme={{ ...eva.dark, ...theme }}
				customMapping={mapping}>
				{!initialized ? (
					<Layout style={styles.container}>
						<Text style={styles.text}>Bookread</Text>
						<Spinner size="giant" />
					</Layout>
				) : (
					<NavigationContainer theme={navigatorTheme}>
						<HomeNavigator />
					</NavigationContainer>
				)}
			</ApplicationProvider>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginBottom: 15,
	},
})
