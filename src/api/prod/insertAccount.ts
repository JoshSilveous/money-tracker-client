import { API_URL } from '../API_URL'

/**
 * Inserts a {@link NewAccount New Account} into the user's database.
 * @param context The {@linkcode Context} object
 * @param newAccount The {@linkcode NewAccount} object
 * @returns A promise, which resolves to the new account's assigned `account_id`
 */
export function insertAccount(context: Context, newAccount: NewAccount) {
	const data = {
		username: context.username,
		token: context.token,
		payload: newAccount,
	}
	const headers = {
		'Content-Type': 'application/json',
	}
	const requestOptions = {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	}
	return fetch(API_URL + 'insertaccount', requestOptions)
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
