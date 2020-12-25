// imports
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HomeNavigator } from '../navigation/home.navigator'
import { navigatorTheme } from '../app/app-theming'

// exports
export const AppNavigator = (): React.ReactElement => (
	<NavigationContainer theme={navigatorTheme}>
		<HomeNavigator />
	</NavigationContainer>
)
