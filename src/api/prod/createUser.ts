import { API_URL } from '../API_URL'

/**
 * Creates a new user in the server's database
 * @param credentials The {@link UserCredentials} object.
 * @returns A promise, that resolves to `void` when complete.
 */
export function createUser(credentials: UserCredentials) {
	const apiUrl = API_URL + 'createuser'

	const headers: HeadersInit = [['Content-Type', 'application/json']]

	const requestOptions: RequestInit = {
		method: 'POST',
		headers,
		body: JSON.stringify(credentials),
	}

	return fetch(apiUrl, requestOptions).then((res) => {
		if (res.ok) {
			return
		} else {
			throw new Error(res.statusText)
		}
	})
}
