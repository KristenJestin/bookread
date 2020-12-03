// imports
import React from 'react'
import { View } from 'react-native'
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components'
import { pad } from '../../utils/number'

// exports
export type CountdownProps = {
	time: number
}

export default ({ time }: CountdownProps): React.ReactElement => {
	const styles = useStyleSheet(themedStyle)

	const minutes = Math.floor(time / 60)
	const seconds = time - minutes * 60

	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				<View style={styles.cardTimer}>
					<Text style={styles.cardTimerText}>{pad(minutes, 2)}</Text>
				</View>
				<Text
					style={styles.cardTitle}
					category="label"
					appearance="hint">
					Minutes
				</Text>
			</View>
			<View style={styles.cardContainer}>
				<View style={styles.cardTimer}>
					<Text style={styles.cardTimerText}>{pad(seconds, 2)}</Text>
				</View>

				<Text
					style={styles.cardTitle}
					category="label"
					appearance="hint">
					Secondes
				</Text>
			</View>
		</View>
	)
}

const themedStyle = StyleService.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	cardContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	cardTitle: {
		textTransform: 'uppercase',
	},
	cardTimer: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 8,
		marginHorizontal: 8,
		borderWidth: 4,
		borderColor: 'color-primary-default',
	},
	cardTimerText: {
		fontSize: 40,
		color: 'color-primary-default',
	},
})
