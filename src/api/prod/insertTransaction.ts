import { API_URL } from '../API_URL'

/**
 * Inserts a new transaction into the user's database.
 * @param context The {@linkcode Context} object
 * @param newTransaction The {@linkcode NewTransaction} object
 * @returns A promise, which resolves to the new transaction's assigned `transaction_id`
 */
export function insertTransaction(
	context: Context,
	newTransaction: NewTransaction
) {
	const apiUrl = API_URL + 'inserttransaction'

	const headers: HeadersInit = [
		['Content-Type', 'application/json'],
		['authorization', `Bearer ${context.token}`],
	]
	const requestOptions: RequestInit = {
		method: 'POST',
		headers,
		body: JSON.stringify(newTransaction),
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
			return data.transaction_id as number
		})
}
