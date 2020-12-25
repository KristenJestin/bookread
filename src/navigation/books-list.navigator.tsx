import React from 'react'
import { RouteProp } from '@react-navigation/core'
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack'
import { BooksTabNavigationProp } from './home.navigator'
import { AppRoute } from './app-routes'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { BooksScreen } from '../screens/books-list'
import {
	BookSavedDetailsScreen,
	BookSavedDetailsRouteParams,
	SessionScreen,
	SessionRouteParams,
} from '../screens/books'
import {
	BookEditRouteParams,
	BookEditScreen,
} from '../screens/books/book-edit.component'

type BooksNavigatorParams = {
	[AppRoute.BOOKS]: undefined
	[AppRoute.BOOK_DETAILS]: BookSavedDetailsRouteParams
	[AppRoute.BOOK_SESSION]: SessionRouteParams
	[AppRoute.BOOK_EDIT]: BookEditRouteParams
}

export type BooksScreenProps = MaterialTopTabBarProps & {
	navigation: BooksTabNavigationProp
}

export interface BookSavedDetailsScreenProps {
	navigation: StackNavigationProp<BooksNavigatorParams, AppRoute.BOOK_DETAILS>
	route: RouteProp<BooksNavigatorParams, AppRoute.BOOK_DETAILS>
}
export interface SessionScreenProps {
	navigation: StackNavigationProp<BooksNavigatorParams, AppRoute.BOOK_SESSION>
	route: RouteProp<BooksNavigatorParams, AppRoute.BOOK_SESSION>
}
export interface BookEditScreenProps {
	navigation: StackNavigationProp<BooksNavigatorParams, AppRoute.BOOK_EDIT>
	route: RouteProp<BooksNavigatorParams, AppRoute.BOOK_EDIT>
}

const Stack = createStackNavigator<BooksNavigatorParams>()

export const BooksNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name={AppRoute.BOOKS} component={BooksScreen} />
		<Stack.Screen
			name={AppRoute.BOOK_DETAILS}
			component={BookSavedDetailsScreen}
		/>
		<Stack.Screen name={AppRoute.BOOK_SESSION} component={SessionScreen} />
		<Stack.Screen name={AppRoute.BOOK_EDIT} component={BookEditScreen} />
	</Stack.Navigator>
)
