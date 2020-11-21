import React from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import {
	Divider,
	Input,
	Layout,
	LayoutElement,
	Text,
} from '@ui-kitten/components'
import { Toolbar } from '../../components/toolbar.component'
import { SearchIcon } from '../../assets/icons'
import { searchBooks } from '../../services/books'

export const BooksScreen = (): LayoutElement => {
	const [books, setBooks] = React.useState([])
	const [search, setSearch] = React.useState('')

	React.useEffect(() => {
		;(async function () {
			try {
				const result = await searchBooks(search)
				const values = await result.json()
				setBooks(values?.items)
			} catch (error) {
				Alert.alert(
					'Erreur',
					'Une erreur est survenue lors de la récupération des livres'
				)
			}
		})()
	}, [search])

	return (
		<React.Fragment>
			<View>
				<Toolbar title="BOOKREAD" />
			</View>
			<Divider />
			<Layout style={styles.container}>
				<View style={styles.searchContainer}>
					<Input
						value={search}
						accessoryLeft={SearchIcon}
						placeholder="Rechercher un livre"
						onChangeText={(nextValue) => setSearch(nextValue)}
					/>
				</View>
				<Text
					style={styles.headerText}
					category="label"
					appearance="hint">
					Resultats
				</Text>
				<FlatList
					data={books}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Text style={{ marginBottom: 20 }}>
							{item.volumeInfo.title}
						</Text>
					)}
				/>
			</Layout>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},

	searchContainer: {
		marginBottom: 15,
	},

	headerText: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
})
