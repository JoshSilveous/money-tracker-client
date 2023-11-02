export function insertCategory(context: Context, newCategory: NewCategory) {
	const apiUrl = 'http://localhost:3000/api/insertcategory'

	const data = {
		username: context.username,
		token: context.token,
		payload: newCategory,
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
			return data.category_id as number
		})
}
