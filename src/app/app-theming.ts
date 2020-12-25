// import { DefaultTheme } from '@react-navigation/native'
import { DefaultTheme } from '@react-navigation/native'
import { default as appTheme } from './app-theme.json'
import { default as appMapping } from './app-mapping.json'

export const theme = appTheme
export const mapping = appMapping

export const navigatorTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent', // prevent layout blinking when performing navigation
	},
}
