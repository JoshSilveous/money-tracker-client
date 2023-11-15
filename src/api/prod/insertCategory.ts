import { API_URL } from '../API_URL'

/**
 * Inserts a {@link NewCategory New Category} into the user's database.
 * @param context The {@linkcode Context} object
 * @param newCategory The {@linkcode NewCategory} object
 * @returns A promise, which resolves to the new category's assigned `category_id`
 */
export function insertCategory(context: Context, newCategory: NewCategory) {
	const apiUrl = API_URL + 'insertcategory'

	const headers: HeadersInit = [
		['Content-Type', 'application/json'],
		['authorization', `Bearer ${context.token}`],
	]
	const requestOptions: RequestInit = {
		method: 'POST',
		headers,
		body: JSON.stringify(newCategory),
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
