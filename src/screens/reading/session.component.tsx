import React from 'react'
import { Alert, BackHandler, StyleSheet, View } from 'react-native'
import {
	Layout,
	LayoutElement,
	Button,
	Text,
	Input,
} from '@ui-kitten/components'
import { useForm } from 'react-hook-form'
import { useTypedController } from '@hookform/strictly-typed'
import { SessionScreenProps } from '../../navigation/reading.navigator'
import BackButton from '../../components/back-button.component'
import Countdown from '../../components/reading/countdown.component'
import { PlayIcon, PauseIcon, AlertIcon } from '../../assets/icons'

type FormData = {
	duration: number
	pages: number
	note: string
}

export type SessionRouteParams = {
	title: string
}

export const SessionScreen = (props: SessionScreenProps): LayoutElement => {
	const { title } = props.route.params
	const { control, handleSubmit, errors } = useForm<FormData>()
	const TypedController = useTypedController<FormData>({ control })
	const [started, setStarted] = React.useState(false)
	const [oneTimeStarteded, setOneTimeStarteded] = React.useState(false)
	let time: number = 0
	let startTime!: Date

	const onTimeChanged = (cur: number) => {
		time = cur
	}

	const onSubmit = handleSubmit(({ duration, pages, note }) => {
		console.log(duration, pages, note)
	})

	React.useEffect(() => {
		const backAction = () => {
			Alert.alert(
				'Hold on!',
				'Êtes vous sur de quitter la session sans enregistrer',
				[
					{
						text: 'ANNULER',
						onPress: () => null,
						style: 'cancel',
					},
					{ text: 'OUI', onPress: props.navigation.goBack },
				]
			)
			return true
		}

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)

		return () => backHandler.remove()
	}, [props.navigation.goBack])

	const renderForm = () => (
		<View>
			<TypedController
				name="duration"
				render={({ onChange, onBlur, value }) => (
					<Input
						keyboardType="number-pad"
						label="Durée"
						placeholder="Durée de la session"
						status={!errors.duration ? undefined : 'danger'}
						caption={
							!errors.duration
								? undefined
								: errors.duration.message
						}
						captionIcon={!errors.duration ? undefined : AlertIcon}
						onBlur={onBlur}
						onChangeText={(val) => onChange(val)}
						value={value.toString()}
					/>
				)}
				rules={{
					required: {
						value: true,
						message: 'Ce champs est requis',
					},
					min: {
						value: 1,
						message: 'La valeur ne peut pas être inférieur a 1',
					},
				}}
				defaultValue={Math.floor(time / 60)}
			/>
			<TypedController
				name="pages"
				render={({ onChange, onBlur, value }) => (
					<Input
						keyboardType="number-pad"
						label="Pages"
						placeholder="Page actuel"
						status={!errors.pages ? undefined : 'danger'}
						caption={
							!errors.pages ? undefined : errors.pages.message
						}
						captionIcon={!errors.pages ? undefined : AlertIcon}
						onBlur={onBlur}
						onChangeText={(val) => onChange(val)}
						value={value?.toString()}
					/>
				)}
				rules={{
					required: {
						value: true,
						message: 'Ce champs est requis',
					},
					min: {
						value: 1,
						message: 'La valeur ne peut pas être inférieur a 1',
					},
				}}
				defaultValue={0}
			/>
			<TypedController
				name="note"
				render={({ onChange, onBlur, value }) => (
					<Input
						multiline
						// eslint-disable-next-line react-native/no-inline-styles
						textStyle={{
							minHeight: 64,
							textAlignVertical: 'top',
						}}
						label="Note"
						placeholder="Note sur la session"
						status={!errors.note ? undefined : 'danger'}
						caption={
							!errors.note ? undefined : errors.note?.message
						}
						captionIcon={!errors.note ? undefined : AlertIcon}
						onBlur={onBlur}
						onChangeText={(val) => onChange(val)}
						value={value?.toString()}
					/>
				)}
				rules={{
					max: {
						value: 500,
						message: 'Vous ne pouvez pas taper plus de 500 mots.',
					},
				}}
				defaultValue=""
			/>

			<Button onPress={onSubmit}>ENREGISTRER</Button>
		</View>
	)

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
						<Countdown
							started={started}
							onTimeChanged={onTimeChanged}
						/>
					</View>
					<View style={styles.playpauseButton}>
						<Button
							style={styles.button}
							appearance="ghost"
							status="primary"
							size="giant"
							accessoryLeft={!started ? PlayIcon : PauseIcon}
							onPress={() => {
								startTime = new Date()
								setStarted((isStarted) => !isStarted)
								setOneTimeStarteded(true)
							}}
						/>
					</View>
					<View style={styles.buttonsContainer}>
						<Button style={styles.button} status="basic">
							QUITTER
						</Button>
						<Button
							style={styles.button}
							disabled={!oneTimeStarteded}
							status="success"
							onPress={() => console.log('test')}>
							TERMINER
						</Button>
					</View>
					{renderForm()}
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
		marginBottom: 10,
		flexDirection: 'row',
	},

	buttonsContainer: {
		flexDirection: 'row',
	},
	button: {
		marginHorizontal: 8,
	},

	playpauseButton: {
		marginBottom: 20,
	},
})
