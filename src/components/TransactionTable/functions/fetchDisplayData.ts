export function fetchDisplayData(
	username: string,
	token: string,
	pageSettings: PageSettings
): Promise<DisplayTransaction[]> {
	const apiUrl = 'http://localhost:3000/api/getdisplaydata'

	const data = {
		username: username,
		token: token,
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
			return data.displayData as DisplayTransaction[]
		})
}
