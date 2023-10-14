import { Link } from 'react-router-dom'
import './Credentials.scss'
import { useState } from 'react'
import { ReactComponent as UsernameIcon } from '../assets/profile.svg'
import { ReactComponent as PasswordIcon } from '../assets/password.svg'

export function Login() {
	const [isError, setIsError] = useState<boolean>(false)
	const [errorBoxText, setErrorBoxText] = useState<string>()
	const [currentFormState, setCurrentFormState] = useState({
		username: '',
		password: '',
	})

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

	function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		setCurrentFormState((prev) => ({ ...prev, username: inputNode.value }))
	}
	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		setCurrentFormState((prev) => ({ ...prev, password: inputNode.value }))
	}

	return (
		<div className='login-account'>
			<h2>Log in</h2>
			<div className='credentials'>
				<div className='form-input-container'>
					<label htmlFor='username-input'>Your username</label>
					<label htmlFor='username-input'>
						<div className='input-text-container'>
							<div className='svg-container'>
								<UsernameIcon />
							</div>
							<input
								type='text'
								id='username-input'
								onBlur={handleUsernameChange}
							/>
						</div>
					</label>
				</div>
				<div className='form-input-container'>
					<label htmlFor='password-input'>Your password</label>
					<label htmlFor='password-input'>
						<div className='input-text-container'>
							<div className='svg-container'>
								<PasswordIcon />
							</div>
							<input
								type='password'
								id='password-input'
								onBlur={handlePasswordChange}
							/>
						</div>
					</label>
				</div>

				<button onClick={loginUser}>LOGIN</button>
				<hr />

				<Link
					to='/authentication/create-account'
					className='button-like'
				>
					CREATE ACCOUNT
				</Link>
			</div>
			{isError && <div className='errorbox'>{errorBoxText}</div>}
		</div>
	)
}
