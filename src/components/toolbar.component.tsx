import React from 'react'
import { ImageProps } from 'react-native'
import {
	StyleType,
	TopNavigation,
	TopNavigationAction,
	TopNavigationActionElement,
	TopNavigationProps,
} from '@ui-kitten/components'
import { BackIcon } from '../assets/icons'

export interface ToolbarProps extends TopNavigationProps {
	menu?: () => React.ReactElement
	backIcon?: (style: StyleType) => React.ReactElement<ImageProps>
	menuIcon?: (style: StyleType) => React.ReactElement<ImageProps>
	onBackPress?: () => void
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {
	const { onBackPress, ...topNavigationProps } = props

	const renderBackAction = (): TopNavigationActionElement => (
		<TopNavigationAction icon={BackIcon} onPress={onBackPress} />
	)

	return (
		<TopNavigation
			{...topNavigationProps}
			alignment="center"
			accessoryLeft={onBackPress && renderBackAction}
		/>
	)
}
