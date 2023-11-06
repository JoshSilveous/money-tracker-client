import { API_URL } from '../API_URL'

/**
 * Retrieves all categories in a user's file from the database.
 * @param context The {@linkcode Context} object
 * @returns A promise, which resolves to a {@linkcode CategoryLite CategoryLite[]}
 */
export function fetchCategories(context: Context): Promise<CategoryLite[]> {
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
	return fetch(API_URL + 'getallcategories', requestOptions)
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
