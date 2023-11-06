import { API_URL } from '../API_URL'

/**
 * Creates a new account in the server's database
 * @param credentials The {@link Credentials} object.
 * @returns A promise, that resolves to `void` when complete.
 */
export function createAccount(credentials: Credentials) {
	const data = credentials
	const headers = {
		'Content-Type': 'application/json',
	}
	const requestOptions = {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	}

	return fetch(API_URL + 'createuser', requestOptions).then((res) => {
		if (res.ok) {
			return
		} else {
			throw new Error(res.statusText)
		}
	})
}
