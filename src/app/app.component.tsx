import React from 'react'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { theme, mapping, navigatorTheme } from './app-theming'
import { HomeNavigator } from '../navigation/home.navigator'
import Database from '../config/database'

export default (): React.ReactElement => {
	React.useEffect(() => {
		;(async () => {
			await Database.setupConnection()
		})()

		return () => {
			Database.closeConnection()
		}
	}, [])

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider
				{...eva}
				theme={{ ...eva.dark, ...theme }}
				customMapping={mapping}>
				<NavigationContainer theme={navigatorTheme}>
					<HomeNavigator />
				</NavigationContainer>
			</ApplicationProvider>
		</>
	)
}
