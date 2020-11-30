// imports
import React from 'react'
import { View } from 'react-native'
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components'
import { pad } from '../../utils/number'

// exports
export type CountdownProps = {
	started: boolean
}

export default ({ started }: CountdownProps): React.ReactElement => {
	const styles = useStyleSheet(themedStyle)
	const [time, setTime] = React.useState(0)
	let interval: number | undefined

	React.useEffect(() => {
		if (started) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			interval = setInterval(() => {
				setTime((lastTime) => lastTime + 1)
			}, 1000)
		} else {
			if (interval !== undefined) clearInterval(interval)
		}

		return () => {
			if (interval !== undefined) clearInterval(interval)
		}
	}, [started])

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
