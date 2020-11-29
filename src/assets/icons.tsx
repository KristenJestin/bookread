import React from 'react'
import { Icon, IconElement } from '@ui-kitten/components'

export const BackIcon = (props: any): IconElement => (
	<Icon {...props} name="chevron-left" />
)

export const SearchIcon = (props: any): IconElement => (
	<Icon {...props} name="search" />
)

export const ReadingIcon = (props: any): IconElement => (
	<Icon {...props} name="book-open" />
)

export const BooksIcon = (props: any): IconElement => (
	<Icon {...props} name="book" />
)

export const GoIcon = (props: any): IconElement => (
	<Icon {...props} name="chevron-right" />
)
