import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Layout, LayoutElement, Button, Text } from '@ui-kitten/components'
import { SessionScreenProps } from '../../navigation/reading.navigator'
import BackButton from '../../components/back-button.component'
import Countdown from '../../components/reading/countdown.component'

export type SessionRouteParams = {
	title: string
}

export const SessionScreen = (props: SessionScreenProps): LayoutElement => {
	const { title } = props.route.params
	const [started, setStarted] = React.useState(false)

	return (
		<React.Fragment>
			<Layout style={styles.container}>
				<BackButton onPress={props.navigation.goBack} />
				<Text style={styles.headerText} category="h1">
					Session de lecture
				</Text>
				<Text category="p2" appearance="hint">
					{title}
				</Text>
				<View style={styles.mainContainer}>
					<View style={styles.countdownContainer}>
						<Countdown started={started} />
					</View>
					<View style={styles.buttonsContainer}>
						<Button style={styles.button} status="basic">
							QUITTER
						</Button>
						<Button
							style={styles.button}
							status="primary"
							onPress={() =>
								setStarted((isStarted) => !isStarted)
							}>
							{!started ? 'DÉMARRER' : 'PAUSE'}
						</Button>
					</View>
				</View>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 50,
	},
	headerText: {},
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	countdownContainer: {
		marginBottom: 50,
		flexDirection: 'row',
	},

	buttonsContainer: {
		flexDirection: 'row',
	},
	button: {
		marginHorizontal: 15,
	},
})
