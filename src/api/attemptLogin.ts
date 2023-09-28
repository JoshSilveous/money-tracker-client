import { url } from './url'

async function attemptLogin(username: string, password: string) {
	const reqBody = {
		username: username,
		password: password,
	}

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reqBody),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`)
			}
			return res.json()
		})
		.then((data) => {
			console.log('Response Data:', data)
		})
		.catch((error) => {
			console.error('Fetch Error:', error)
		})
}
export default attemptLogin
