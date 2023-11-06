import { API_URL } from '../API_URL'

/**
 * Retrieves all accounts in a user's file from the database.
 * @param context The {@linkcode Context} object
 * @returns A promise, which resolves to a {@linkcode AccountLite AccountLite[]}
 */
export function fetchAccounts(context: Context): Promise<AccountLite[]> {
	const data = {
		username: context.username,
		token: context.token,
	}
	const headers = {
		'Content-Type': 'application/json',
	}
	const requestOptions = {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	}
	return fetch(API_URL + 'getallaccounts', requestOptions)
		.then((res) => {
			console.log('res recieved:', res)
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
export interface test {
	name: string
}
