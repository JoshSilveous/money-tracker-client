import { API_URL } from '../API_URL'

/**
 * Inserts a {@link NewTransaction New Transaction} into the user's database.
 * @param context The {@linkcode Context} object
 * @param newTransaction The {@linkcode NewTransaction} object
 * @returns A promise, which resolves to the new transaction's assigned `transaction_id`
 */
export function insertTransaction(
	context: Context,
	newTransaction: NewTransaction
) {
	const data = {
		username: context.username,
		token: context.token,
		payload: newTransaction,
	}
	const headers = {
		'Content-Type': 'application/json',
	}
	const requestOptions = {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	}
	return fetch(API_URL + 'inserttransaction', requestOptions)
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
