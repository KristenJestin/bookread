// imports
import axios from 'axios'
import { BOOK_API_URL, BOOK_API_KEY } from '../config/env'

// data
const instance = axios.create({
	baseURL: BOOK_API_URL,
	timeout: 1000,
	data: {
		key: BOOK_API_KEY,
	},
})

// exports
export default instance
