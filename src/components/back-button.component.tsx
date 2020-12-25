import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { BackIcon } from '../assets/icons'

type BackButtonProps = {
	onPress: () => void
}

export default ({ onPress }: BackButtonProps): React.ReactElement => (
	<TouchableOpacity style={styles.container} onPress={onPress}>
		<BackIcon fill="#ddd" style={styles.icon} />
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 10,
		left: 10,
	},
	icon: {
		height: 42,
		width: 42,
	},
})
