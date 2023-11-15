import { API_URL } from '../API_URL'

export function insertAccount(context: Context, newAccount: NewAccount) {
	const apiUrl = API_URL + 'insertaccount'

	const headers: HeadersInit = [
		['Content-Type', 'application/json'],
		['authorization', `Bearer ${context.token}`],
	]
	const requestOptions: RequestInit = {
		method: 'POST',
		headers,
		body: JSON.stringify(newAccount),
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
			context.refreshToken(data.refreshedToken)
			return data.account_id as number
		})
}
