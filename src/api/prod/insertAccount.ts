export function insertAccount(context: Context, newAccount: NewAccount) {
	const apiUrl = 'http://localhost:3000/api/insertaccount'

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
