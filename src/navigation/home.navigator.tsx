import React from 'react'
import {
	BottomTabBarProps,
	BottomTabNavigationProp,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { HomeTabBar } from '../screens/home'
import { ReadingScreen } from '../screens/reading'
import { BooksScreen } from '../screens/books'
import { AppRoute } from './app-routes'
import { ReadingIcon, BooksIcon } from '../assets/icons'

type HomeBottomTabsNavigatorParams = {
	[AppRoute.READING]: undefined
	[AppRoute.BOOKS]: undefined
}

export type ReadingTabNavigationProp = BottomTabNavigationProp<
	HomeBottomTabsNavigatorParams,
	AppRoute.READING
>

export type BooksTabNavigationProp = BottomTabNavigationProp<
	HomeBottomTabsNavigatorParams,
	AppRoute.BOOKS
>

export type BottomHomeScreenProps = BottomTabBarProps & {
	navigation: ReadingTabNavigationProp
}

const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>()
export const HomeNavigator = (): React.ReactElement => (
	// @ts-ignore: `tabBar` also contains a DrawerNavigationProp
	<BottomTab.Navigator tabBar={HomeTabBar}>
		<BottomTab.Screen
			name={AppRoute.READING}
			component={ReadingScreen}
			options={{ title: 'LECTURES', tabBarIcon: ReadingIcon }}
		/>
		<BottomTab.Screen
			name={AppRoute.BOOKS}
			component={BooksScreen}
			options={{ title: 'LIVRES', tabBarIcon: BooksIcon }}
		/>
	</BottomTab.Navigator>
)
