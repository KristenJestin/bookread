import React from 'react'
import { Alert, Animated, BackHandler, StyleSheet, View } from 'react-native'
import {
	Layout,
	LayoutElement,
	Button,
	Text,
	Input,
	Modal,
	Card,
} from '@ui-kitten/components'
import { useForm } from 'react-hook-form'
import { useTypedController } from '@hookform/strictly-typed'
import { SessionScreenProps } from '../../navigation/reading.navigator'
import BackButton from '../../components/back-button.component'
import Countdown from '../../components/reading/countdown.component'
import { PlayIcon, PauseIcon, AlertIcon } from '../../assets/icons'
import { SessionData } from '../../data/models/session.model'
import Database from '../../config/database'
import { generateModelId } from '../../data/models/default.model'
import Book from '../../data/models/book.model'

const onBackWanted = (goBack: () => void) =>
	Alert.alert(
		'Hold on!',
		'Êtes vous sur de quitter la session sans enregistrer ?',
		[
			{
				text: 'ANNULER',
				onPress: () => null,
				style: 'cancel',
			},
			{ text: 'OUI', onPress: goBack },
		]
	)

type StartInfo = {
	started: boolean
	startDate?: Date
	oneTimeStarted: boolean
}

type FormData = {
	duration: number
	pages: number
	note: string
}

export type SessionRouteParams = {
	bookId: string
	bookTitle: string
	bookPages: number
	bookCurrentPage?: number
}

export const SessionScreen = (props: SessionScreenProps): LayoutElement => {
	const { bookId, bookTitle, bookPages, bookCurrentPage } = props.route.params
	const [startInfo, setStartInfo] = React.useState<StartInfo>({
		oneTimeStarted: false,
		started: false,
	})
	// const [oneTimeStarteded, setOneTimeStarteded] = React.useState(false)
	const [formVisible, setFormVisible] = React.useState(false)
	const { control, handleSubmit, errors } = useForm<FormData>()
	const TypedController = useTypedController<FormData>({ control })
	const [time, setTime] = React.useState(0)
	// const [startTime, setStartTime] = React.useState<Date>()

	let interval: number | undefined
	let opacityAnimation = new Animated.Value(formVisible ? 1.0 : 0.0)

	// animate modal
	React.useEffect(() => {
		if (formVisible) {
			Animated.spring(opacityAnimation, {
				toValue: 1.0,
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(opacityAnimation, {
				toValue: 0.0,
				duration: 1000,
				useNativeDriver: true,
			}).start()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formVisible])

	React.useEffect(() => {
		if (startInfo.started) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			interval = setInterval(() => {
				setTime((lastTime) => lastTime + 1)
			}, 934)
		} else {
			if (interval !== undefined) clearInterval(interval)
		}

		return () => {
			if (interval !== undefined) clearInterval(interval)
		}
	}, [startInfo.started])

	// when form is submitting
	const onSubmit = handleSubmit(({ duration, pages, note }) => {
		const session: SessionData = {
			id: generateModelId(),
			duration: Number(duration),
			pages: Number(pages),
			note,
			startedAt: startInfo.startDate || new Date(),
		}

		;(async () => {
			const book = await Database.find(Book, bookId)
			await Database.query(() => {
				if (!book) {
					Alert.alert(
						'Erreur',
						'Une erreur est survenue avec le livre'
					)
					props.navigation.goBack()
					return
				}

				if (book.currentReading) {
					book.currentReading.sessions.push(session)
					book.currentReading.pages = Number(pages)
					book.updatedAt = new Date()
				}
			})

			setFormVisible(false)
			props.navigation.goBack()
		})()
	})

	// when user press back button
	React.useEffect(() => {
		const backAction = () => {
			onBackWanted(props.navigation.goBack)
			return true
		}

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)

		return () => backHandler.remove()
	}, [props.navigation.goBack])

	// render form
	const renderForm = () => (
		<View>
			<View style={styles.formGroup}>
				<TypedController
					name="duration"
					render={({ onChange, onBlur, value }) => (
						<Input
							keyboardType="number-pad"
							label="Durée (minutes)"
							placeholder="Durée de la session"
							status={!errors.duration ? undefined : 'danger'}
							caption={
								!errors.duration
									? undefined
									: errors.duration.message
							}
							captionIcon={
								!errors.duration ? undefined : AlertIcon
							}
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
							value: 0,
							message: 'La valeur ne peut pas être inférieur a 0',
						},
					}}
					defaultValue={Math.floor(time / 60)}
				/>
			</View>
			<View style={styles.formGroup}>
				<TypedController
					name="pages"
					render={({ onChange, onBlur, value }) => (
						<Input
							keyboardType="number-pad"
							label="Page actuelle"
							placeholder="Page actuelle"
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
							value: 0,
							message: 'La valeur ne peut pas être inférieur a 0',
						},
						max: {
							value: bookPages,
							message:
								'La valeur ne peut pas être supérieur au nombre de page du livre',
						},
					}}
					defaultValue={bookCurrentPage}
				/>
			</View>
			<View style={styles.formGroup}>
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
							message:
								'Vous ne pouvez pas taper plus de 500 mots.',
						},
					}}
					defaultValue=""
				/>
			</View>

			<Button onPress={onSubmit}>ENREGISTRER</Button>
		</View>
	)

	return (
		<React.Fragment>
			<Layout style={styles.container}>
				<BackButton
					onPress={() => onBackWanted(props.navigation.goBack)}
				/>
				<Text style={styles.headerText} category="h1">
					Session de lecture
				</Text>
				<Text category="p2" appearance="hint">
					{bookTitle}
				</Text>
				<View style={styles.mainContainer}>
					<View style={styles.countdownContainer}>
						<Countdown time={time} />
					</View>
					<View style={styles.playpauseButton}>
						<Button
							style={styles.button}
							appearance="ghost"
							status="primary"
							size="giant"
							accessoryLeft={
								!startInfo.started ? PlayIcon : PauseIcon
							}
							onPress={() => {
								if (!startInfo.oneTimeStarted)
									setStartInfo((info) => ({
										startDate: new Date(),
										started: !info.started,
										oneTimeStarted: true,
									}))
								else {
									setStartInfo((info) => ({
										...info,
										started: !info.started,
									}))
								}
							}}
						/>
					</View>
					<View style={styles.buttonsContainer}>
						<Button style={styles.button} status="basic">
							QUITTER
						</Button>
						<Button
							style={styles.button}
							disabled={!startInfo.oneTimeStarted}
							status="success"
							onPress={() => {
								setFormVisible(true)
								setStartInfo((info) => ({
									...info,
									started: false,
								}))
							}}>
							TERMINER
						</Button>
					</View>
				</View>
				<Modal
					visible={formVisible}
					backdropStyle={styles.backdrop}
					style={styles.modal}
					// onBackdropPress={() => setFormVisible(false)}
				>
					<Animated.View
						style={[
							styles.modalContainer,
							{ opacity: opacityAnimation },
						]}>
						<Card disabled={true}>{renderForm()}</Card>
					</Animated.View>
				</Modal>
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

	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modal: {
		width: '70%',
	},
	modalContainer: {
		width: '100%',
		height: '100%',
	},
	formGroup: {
		marginBottom: 10,
	},
})
