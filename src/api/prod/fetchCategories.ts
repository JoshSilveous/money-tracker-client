export function fetchCategories(context: Context): Promise<CategoryLite[]> {
	const apiUrl = 'http://localhost:3000/api/getallcategories'

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
	return fetch(apiUrl, requestOptions)
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
			return data.categories as CategoryLite[]
		})
}
