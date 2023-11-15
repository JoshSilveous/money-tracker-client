import { API_URL } from '../API_URL'

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
	const apiUrl = API_URL + 'getdisplaydata'

	const headers: HeadersInit = [
		['Content-Type', 'application/json'],
		['authorization', `Bearer ${context.token}`],
		['res_per_page', `${pageSettings.resPerPage}`],
		['this_page', `${pageSettings.thisPage}`],
		['order_by', pageSettings.orderBy],
		['order_by_direction', pageSettings.orderByDirection],
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
			return data.displayData as DisplayTransaction[]
		})
}
