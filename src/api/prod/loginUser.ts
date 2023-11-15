import { API_URL } from '../API_URL'

/**
 * Attempts to validate provided credentials. If credentials are correct, returns the new token.
 * @param credentials The {@linkcode Credentials} object (username and password)
 * @returns The new session's `Token` as a string
 */
export function loginUser(credentials: UserCredentials) {
	const apiUrl = API_URL + 'loginuser'

	const headers: HeadersInit = [['Content-Type', 'application/json']]

	const requestOptions: RequestInit = {
		method: 'POST',
		headers,
		body: JSON.stringify(credentials),
	}

	return fetch(apiUrl, requestOptions)
		.then((res) => {
			if (res.ok) {
				return res.json()
			} else {
				throw new Error(res.statusText)
			}
		})
		.then((data) => {
			return data.token as Context['token']
		})
}
