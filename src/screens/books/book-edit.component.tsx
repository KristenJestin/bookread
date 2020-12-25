import React from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import {
	Layout,
	LayoutElement,
	Spinner,
	Input,
	Text,
	Datepicker,
	Button,
} from '@ui-kitten/components'
import { BookEditScreenProps } from '../../navigation/reading.navigator'
import Book, { BookData } from '../../data/models/book.model'
import Database from '../../config/database'
import BackButton from '../../components/back-button.component'
import { useForm } from 'react-hook-form'
import { useTypedController } from '@hookform/strictly-typed'
import { AlertIcon, DeleteIcon } from '../../assets/icons'

type FormData = {
	title: string
	pages: number
	overview: string
	authors: string
	publisher: string
	categories: string
	image: string
	publication: Date
}

export type BookEditRouteParams = {
	bookKey: string
}

const onDeleteWanted = (goDelete: () => void) =>
	Alert.alert('Hold on!', 'Êtes vous sur de vouloir supprimer le livre ?', [
		{
			text: 'ANNULER',
			onPress: () => null,
			style: 'cancel',
		},
		{ text: 'OUI', onPress: goDelete },
	])

export const BookEditScreen = (props: BookEditScreenProps): LayoutElement => {
	const { bookKey } = props.route.params
	const [book, setBook] = React.useState<Book>()
	const { control, handleSubmit, errors } = useForm<FormData>()
	const TypedController = useTypedController<FormData>({ control })

	// find book from sended key
	React.useMemo(() => {
		;(async () => {
			setBook(await Database.find(Book, bookKey))
		})()
	}, [bookKey])

	// when searching book
	if (!book) {
		return (
			<React.Fragment>
				<Layout style={styles.loadingContainer}>
					<BackButton onPress={props.navigation.goBack} />
					<Spinner />
				</Layout>
			</React.Fragment>
		)
	}

	// when form is submitting
	const onSubmit = handleSubmit(
		({
			title,
			pages,
			overview,
			authors,
			publisher,
			categories,
			image,
			publication,
		}) => {
			;(async () => {
				await Database.query(() => {
					if (book.title !== title) book.title = title
					if (book.pages !== pages) book.pages = pages
					if (book.description !== overview)
						book.description = overview
					if (
						book.authors !==
						authors.split(',').map((author) => author.trim())
					)
						book.authors = authors
							.split(',')
							.map((author) => author.trim())
					if (book.publisher !== publisher) book.publisher = publisher
					if (
						book.categories !==
						categories.split(',').map((category) => category.trim())
					)
						book.categories = categories
							.split(',')
							.map((category) => category.trim())
					if (book.image !== image) book.image = image
					if (book.publishedAt !== publication)
						book.publishedAt = publication

					book.updatedAt = new Date()
				})

				props.navigation.goBack()
			})()
		}
	)

	// when want delete book
	const onDelete = () => {
		;(async () => {
			await Database.query(() => {
				if (book.currentReading != null)
					Database.getConnection().delete(book.currentReading)
				if (book.readed != null)
					Database.getConnection().delete(book.readed)
				if (book.identifiers != null)
					Database.getConnection().delete(book.identifiers)

				Database.getConnection().delete(book)
			})

			props.navigation.popToTop()
		})()
	}

	return (
		<React.Fragment>
			<Layout style={styles.container}>
				<BackButton onPress={props.navigation.goBack} />
				<ScrollView style={styles.scroll}>
					<Text category="h1">Édition</Text>
					<View style={styles.formGroup}>
						<TypedController
							name="title"
							render={({ onChange, onBlur, value }) => (
								<Input
									label="Titre"
									placeholder="Titre du livre"
									style={styles.formInput}
									status={
										!errors.title ? undefined : 'danger'
									}
									caption={
										!errors.title
											? undefined
											: errors.title.message
									}
									captionIcon={
										!errors.title ? undefined : AlertIcon
									}
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
								/>
							)}
							rules={{
								required: {
									value: true,
									message: 'Ce champs est requis',
								},
							}}
							defaultValue={book.title}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="pages"
							render={({ onChange, onBlur, value }) => (
								<Input
									keyboardType="number-pad"
									label="Pages"
									placeholder="Nombre de page"
									style={styles.formInput}
									status={
										!errors.pages ? undefined : 'danger'
									}
									caption={
										!errors.pages
											? undefined
											: errors.pages.message
									}
									captionIcon={
										!errors.pages ? undefined : AlertIcon
									}
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
									message:
										'Le livre doit contenir plus de 1 page',
								},
							}}
							defaultValue={book.pages}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="overview"
							render={({ onChange, onBlur, value }) => (
								<Input
									label="Synopsis"
									placeholder="Synopsis du livre"
									multiline
									numberOfLines={3}
									style={styles.formInput}
									status={
										!errors.overview ? undefined : 'danger'
									}
									caption={
										!errors.overview
											? undefined
											: errors.overview.message
									}
									captionIcon={
										!errors.overview ? undefined : AlertIcon
									}
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
								/>
							)}
							defaultValue={book.description}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="authors"
							render={({ onChange, onBlur, value }) => (
								<Input
									label="Auteurs"
									placeholder="Auteurs du livre"
									style={styles.formInput}
									status={
										!errors.authors ? undefined : 'danger'
									}
									caption={
										!errors.authors
											? undefined
											: errors.authors.message
									}
									captionIcon={
										!errors.authors ? undefined : AlertIcon
									}
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
								/>
							)}
							defaultValue={book.authors.join(', ')}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="publisher"
							render={({ onChange, onBlur, value }) => (
								<Input
									label="Éditeur"
									placeholder="Éditeur du livre"
									style={styles.formInput}
									status={
										!errors.publisher ? undefined : 'danger'
									}
									caption={
										!errors.publisher
											? undefined
											: errors.publisher.message
									}
									captionIcon={
										!errors.publisher
											? undefined
											: AlertIcon
									}
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
								/>
							)}
							defaultValue={book.publisher}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="categories"
							render={({ onChange, onBlur, value }) => (
								<Input
									label="Catégories"
									placeholder="Catégorie du livre"
									style={styles.formInput}
									status={
										!errors.categories
											? undefined
											: 'danger'
									}
									caption={
										!errors.categories
											? undefined
											: errors.categories.message
									}
									captionIcon={
										!errors.categories
											? undefined
											: AlertIcon
									}
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
								/>
							)}
							defaultValue={book.categories.join(', ')}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="image"
							render={({ onChange, onBlur, value }) => (
								<Input
									label="Image"
									placeholder="Image du livre"
									style={styles.formInput}
									status={
										!errors.image ? undefined : 'danger'
									}
									caption={
										!errors.image
											? undefined
											: errors.image.message
									}
									captionIcon={
										!errors.image ? undefined : AlertIcon
									}
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
								/>
							)}
							defaultValue={book.image}
						/>
					</View>
					<View style={styles.formGroup}>
						<TypedController
							name="publication"
							render={({ onChange, onBlur, value }) => (
								<Datepicker
									date={value}
									onSelect={(nextDate) => onChange(nextDate)}
									label="Date de sortie"
									placeholder="Date de sortie du livre"
									style={styles.formInput}
									status={
										!errors.publication
											? undefined
											: 'danger'
									}
									caption={
										!errors.publication
											? undefined
											: errors.publication.message
									}
									captionIcon={
										!errors.publication
											? undefined
											: AlertIcon
									}
									onBlur={onBlur}
									min={new Date('1800-01-01')}
									max={
										new Date(
											new Date().setFullYear(
												new Date().getFullYear() + 50
											)
										)
									}
								/>
							)}
							defaultValue={book.publishedAt}
						/>
					</View>
					<View style={styles.buttonsContainer}>
						<Button style={styles.button} onPress={onSubmit}>
							Sauvegarder
						</Button>
						<Button
							style={styles.deleteButton}
							status="danger"
							accessoryLeft={DeleteIcon}
							onPress={() => onDeleteWanted(onDelete)}
						/>
					</View>
				</ScrollView>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 60,
	},
	loadingContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},

	scroll: {
		width: '100%',
		padding: 20,
		paddingTop: 0,
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginTop: 15,
		marginBottom: 15,
	},
	button: {
		flex: 1,
	},
	deleteButton: {
		marginLeft: 15,
	},

	formGroup: {
		marginBottom: 10,
		flex: 1,
	},
	formInput: {},
})
