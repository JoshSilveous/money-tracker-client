import { Link } from 'react-router-dom'
import './Credentials.scss'
import { useState } from 'react'

export function Login() {
	const [isError, setIsError] = useState<boolean>(false)
	const [errorBoxText, setErrorBoxText] = useState<string>()

	function loginUser() {
		const username = (
			document.getElementById('username') as HTMLInputElement
		).value
		const password = (
			document.getElementById('password') as HTMLInputElement
		).value

		const apiUrl = 'http://localhost:3000/api/loginuser'
		const data = {
			username: username,
			password: password,
		}
		const headers = {
			'Content-Type': 'application/json',
		}
		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		}

		fetch(apiUrl, requestOptions)
			.then((res) => {
				if (res.ok) {
					setIsError(false)
					setErrorBoxText(res.statusText)
					return res.json()
				} else {
					setIsError(true)
					if (res.statusText === 'ERROR_CREDENTIALS') {
						setErrorBoxText(
							'Credentials do not match an existing user.'
						)
						throw new Error(res.statusText)
					}
				}
			})
			.then((data) => {
				console.log(data.token)
			})
	}
	return (
		<div className='authentication'>
			<h2>Login!</h2>
			<div className='credentials'>
				<div className='username-container'>
					<label htmlFor='username'>Username</label>
					<input type='text' id='username' />
				</div>
				<div className='password-container'>
					<label htmlFor='password'>Password</label>
					<input type='text' id='password' />
				</div>
			</div>
			<button onClick={loginUser}>LOGIN</button>
			{isError && <div className='errorbox'>{errorBoxText}</div>}

			<Link to='/authentication/create-account'>Create account</Link>
		</div>
	)
}
