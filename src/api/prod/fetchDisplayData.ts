import { API_URL } from '../API_URL'

/**
 * Retrieves transaction data from the database, in `DisplayTransaction`
 * format, based on the provided `PageSettings`.
 *
 * @param context The {@linkcode Context} object
 * @param pageSettings The {@linkcode PageSettings} object used to tune the query.
 * @returns A promise, which resolves to a {@linkcode DisplayTransaction DisplayTransaction[]}
 */
export function fetchDisplayData(
	context: Context,
	pageSettings: PageSettings
): Promise<DisplayTransaction[]> {
	const data = {
		username: context.username,
		token: context.token,
		payload: pageSettings,
	}
	const headers = {
		'Content-Type': 'application/json',
	}
	const requestOptions = {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	}
	return fetch(API_URL + 'getdisplaydata', requestOptions)
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
			return data.displayData as DisplayTransaction[]
		})
}
