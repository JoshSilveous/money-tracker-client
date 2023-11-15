import { API_URL } from '../API_URL'

/**
 * Retrieves all accounts in a user's file from the database.
 * @param context The {@linkcode Context} object
 * @returns A promise, which resolves to a {@linkcode AccountLite AccountLite[]}
 */
export function fetchAccounts(context: Context): Promise<AccountLite[]> {
	const apiUrl = API_URL + 'getallaccounts'

	const headers: HeadersInit = [
		['Content-Type', 'application/json'],
		['authorization', `Bearer ${context.token}`],
	]
	const requestOptions: RequestInit = {
		method: 'GET',
		headers,
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
			return data.accounts as AccountLite[]
		})
}
