import { API_URL } from '../API_URL'

export function fetchCategories(context: Context): Promise<CategoryLite[]> {
	const apiUrl = API_URL + 'getallcategories'

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
