/**
 * Uses an API call to insert a Transaction into the database.
 * @param context
 * @param newTransaction
 * @returns
 */
export function insertTransaction(
	context: Context,
	newTransaction: NewTransaction
) {
	const apiUrl = 'http://localhost:3000/api/inserttransaction'

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
			return data.transaction_id as Transaction['transaction_id']
		})
}
