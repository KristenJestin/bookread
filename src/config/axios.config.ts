// imports
import axios from 'axios'
// import { BOOK_API_URL, BOOK_API_KEY } from '../config/env'
import EnvConfig from '../config/env'

// data
const instance = axios.create({
	baseURL: EnvConfig.BOOK_API_URL,
	timeout: 1000,
	data: {
		key: EnvConfig.BOOK_API_KEY,
	},
})

// exports
export default instance
