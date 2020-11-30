import React from 'react'
import { RouteProp } from '@react-navigation/core'
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack'
import { ReadingTabNavigationProp } from './home.navigator'
import { AppRoute } from './app-routes'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import {
	ReadingScreen,
	BookSavedDetailsScreen,
	BookSavedDetailsRouteParams,
	SessionScreen,
	SessionRouteParams,
} from '../screens/reading'

type ReadingNavigatorParams = {
	[AppRoute.READING]: undefined
	[AppRoute.BOOK_DETAILS]: BookSavedDetailsRouteParams
	[AppRoute.BOOK_SESSION]: SessionRouteParams
}

export type ReadingScreenProps = MaterialTopTabBarProps & {
	navigation: ReadingTabNavigationProp
}

export interface BookSavedDetailsScreenProps {
	navigation: StackNavigationProp<
		ReadingNavigatorParams,
		AppRoute.BOOK_DETAILS
	>
	route: RouteProp<ReadingNavigatorParams, AppRoute.BOOK_DETAILS>
}
export interface SessionScreenProps {
	navigation: StackNavigationProp<
		ReadingNavigatorParams,
		AppRoute.BOOK_SESSION
	>
	route: RouteProp<ReadingNavigatorParams, AppRoute.BOOK_SESSION>
}

const Stack = createStackNavigator<ReadingNavigatorParams>()

export const ReadingNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name={AppRoute.READING} component={ReadingScreen} />
		<Stack.Screen
			name={AppRoute.BOOK_DETAILS}
			component={BookSavedDetailsScreen}
		/>
		<Stack.Screen name={AppRoute.BOOK_SESSION} component={SessionScreen} />
	</Stack.Navigator>
)
