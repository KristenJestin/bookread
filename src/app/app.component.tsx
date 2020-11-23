import React from 'react'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { theme, mapping, navigatorTheme } from './app-theming'
import { HomeNavigator } from '../navigation/home.navigator'

export default (): React.ReactElement => (
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
