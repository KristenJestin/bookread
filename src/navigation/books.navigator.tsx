import React from 'react'
import { RouteProp } from '@react-navigation/core'
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack'
import { BooksTabNavigationProp } from './home.navigator'
import { AppRoute } from './app-routes'
import { BookDetailsRouteParams, BookDetailsScreen } from '../screens/books'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { BooksScreen } from '../screens/books'

type BooksNavigatorParams = {
	[AppRoute.BOOKS]: undefined
	[AppRoute.BOOK_DETAILS]: BookDetailsRouteParams
}

export type BooksScreenProps = MaterialTopTabBarProps & {
	navigation: BooksTabNavigationProp
}

export interface BooksDetailsScreenProps {
	navigation: StackNavigationProp<BooksNavigatorParams, AppRoute.BOOK_DETAILS>
	route: RouteProp<BooksNavigatorParams, AppRoute.BOOK_DETAILS>
}

const Stack = createStackNavigator<BooksNavigatorParams>()

export const BooksNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name={AppRoute.BOOKS} component={BooksScreen} />
		<Stack.Screen
			name={AppRoute.BOOK_DETAILS}
			component={BookDetailsScreen}
		/>
	</Stack.Navigator>
)
