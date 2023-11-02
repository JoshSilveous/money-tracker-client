export function devGetCategories(
	username: string,
	token: string
): Promise<CategoryLite[]> {
	const apiUrl = 'http://localhost:3000/api/getallcategories'
	const data = {
		username: username,
		token: token,
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
			return data.categories as CategoryLite[]
		})
}
