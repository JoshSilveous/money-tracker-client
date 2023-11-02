/**
 * Retrieves transaction data from the database, in `DisplayTransaction`
 * format, based on the provided `PageSettings`.
 *
 * @param context The `Context` object
 * @param pageSettings The `PageSettings` object used to tune the query.
 * @returns A promise, which resolves to `DisplayTransaction[]`
 */
export function fetchDisplayData(
	context: Context,
	pageSettings: PageSettings
): Promise<DisplayTransaction[]> {
	const apiUrl = 'http://localhost:3000/api/getdisplaydata'

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
			return data.displayData as DisplayTransaction[]
		})
}
