import { API_URL } from '../API_URL'

/**
 * Inserts a {@link NewCategory New Category} into the user's database.
 * @param context The {@linkcode Context} object
 * @param newCategory The {@linkcode NewCategory} object
 * @returns A promise, which resolves to the new category's assigned `category_id`
 */
export function insertCategory(context: Context, newCategory: NewCategory) {
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
	return fetch(API_URL + 'insertcategory', requestOptions)
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
