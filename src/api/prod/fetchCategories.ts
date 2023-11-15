import { API_URL } from '../API_URL'

/**
 * Retrieves all categories in a user's file from the database.
 * @param context The {@linkcode Context} object
 * @returns A promise, which resolves to a {@linkcode CategoryLite CategoryLite[]}
 */
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
