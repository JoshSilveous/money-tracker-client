import { useState } from 'react'
export function TestAPI() {
    
	const[isError, setIsError] = useState<boolean>(false)
	const [infoBoxText, setInfoBoxText] = useState<string>()

	//testing login functions

	function createUser() {
		const username = (document.getElementById('username') as HTMLInputElement).value
		const password = (document.getElementById('password') as HTMLInputElement).value

		const apiUrl = 'http://localhost:3000/api/createuser'
		const data = {
			username: username,
			password: password
		}
		const headers = {
			'Content-Type': 'application/json'
		}
		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		}

		fetch(apiUrl, requestOptions)
			.then(res => {
				if (res.ok) {
					setIsError(false)
					setInfoBoxText(res.statusText)
				} else {
					setIsError(true)
					setInfoBoxText(res.statusText)
				}
			})

	}
	function loginUser() {
		const username = (document.getElementById('username') as HTMLInputElement).value
		const password = (document.getElementById('password') as HTMLInputElement).value
		console.log('logging in user', username, password)

		const apiUrl = 'http://localhost:3000/api/loginuser'
		const data = {
			username: username,
			password: password
		}
		const headers = {
			'Content-Type': 'application/json'
		}
		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		}

		fetch(apiUrl, requestOptions)
			.then(res => {
				if (res.ok) {
					setIsError(false)
					setInfoBoxText(res.statusText)
					return res.json()
				} else {
					setIsError(true)
					setInfoBoxText(res.statusText)
				}
			})
			.then(data => {
				console.log(data.token)
			})
	}
    return <>
        <h2>Test API!</h2>
        <div>
			<label htmlFor="username">Username:</label>
			<input id="username" type="text"></input><br />
			<label htmlFor="password">Password:</label>
			<input id="password" type="text"></input><br />
			<button onClick={createUser}>Create</button>
			<button onClick={loginUser}>Login</button><br /><br />
			<div style={{backgroundColor: isError ? 'lightpink' : 'lightgreen'}}>{infoBoxText}</div>

		</div>
    </>
}