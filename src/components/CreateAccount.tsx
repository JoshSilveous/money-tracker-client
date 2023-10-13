import { Link } from 'react-router-dom'
import './Credentials.scss'
import { useState } from 'react'

export function CreateAccount() {
	const [currentFormState, setCurrentFormState] = useState({
		username: { value: '', error: false },
		password: { value: '', error: false },
		passwordConfirm: { value: '', error: false },
	})
	const [statusText, setStatusText] = useState('')

	function createUser() {
		if (
			currentFormState.password.value !==
			currentFormState.passwordConfirm.value
		) {
			console.log('no match')
			setStatusText('Password confirmation does not match.')
			console.log(currentFormState)
			return
		}

		const apiUrl = 'http://localhost:3000/api/createuser'
		const data = {
			username: currentFormState.username.value,
			password: currentFormState.password.value,
		}

		const headers = {
			'Content-Type': 'application/json',
		}
		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		}

		fetch(apiUrl, requestOptions).then((res) => {
			if (res.ok) {
				setStatusText('Account created.')
			} else {
				if (res.statusText === 'ERROR_DUPLICATE_PASSWORD') {
					setStatusText(
						'Password already exists, please pick another.'
					)
				} else if (res.statusText === 'ERROR_DUPLICATE_USERNAME') {
					setStatusText(
						'Username already exists, please pick another.'
					)
				} else {
					setStatusText(res.statusText)
				}
			}
		})
	}

	function handleUsernameBlur(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		setCurrentFormState((prev) => ({
			...prev,
			username: {
				value: inputNode.value,
				error: prev.username.error,
			},
		}))
	}
	function handlePasswordBlur(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		setCurrentFormState((prev) => ({
			...prev,
			password: {
				value: inputNode.value,
				error: prev.password.error,
			},
		}))
	}
	function handlePasswordConfirmChange(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		const inputNode = e.target as HTMLInputElement
		if (
			!currentFormState.passwordConfirm.error &&
			inputNode.value !== currentFormState.password.value
		) {
			setCurrentFormState((prev) => ({
				...prev,
				passwordConfirm: {
					value: inputNode.value,
					error: true,
				},
			}))
		} else if (
			currentFormState.passwordConfirm.error &&
			inputNode.value === currentFormState.password.value
		) {
			setCurrentFormState((prev) => ({
				...prev,
				passwordConfirm: {
					value: inputNode.value,
					error: false,
				},
			}))
		}
	}

	function handlePasswordConfirmBlur(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		setCurrentFormState((prev) => ({
			...prev,
			passwordConfirm: {
				value: inputNode.value,
				error: prev.passwordConfirm.error,
			},
		}))
	}

	return (
		<div className='create-new-account'>
			<h2>Create new account</h2>
			<div className='credentials'>
				<div className='form-input-container'>
					<label htmlFor='username-input'>Your username</label>
					<label htmlFor='username-input'>
						<div
							className={`input-text-container ${
								currentFormState.username.error ? 'error' : ''
							}`}
						>
							<div className='img-container'>
								<img src='/assets/profile.svg' />
							</div>
							<input
								type='text'
								id='username-input'
								onBlur={handleUsernameBlur}
							/>
						</div>
					</label>
				</div>
				<div className='form-input-container'>
					<label htmlFor='password-input'>Your password</label>
					<label htmlFor='password-input'>
						<div
							className={`input-text-container ${
								currentFormState.password.error ? 'error' : ''
							}`}
						>
							<div className='img-container'>
								<img src='/assets/password.svg' />
							</div>
							<input
								type='password'
								id='password-input'
								onBlur={handlePasswordBlur}
							/>
						</div>
					</label>
				</div>
				<div className='form-input-container'>
					<label htmlFor='passwordconfirm-input'>
						Confirm your password
					</label>
					<label htmlFor='passwordconfirm-input'>
						<div
							className={`input-text-container ${
								currentFormState.passwordConfirm.error
									? 'error'
									: ''
							}`}
						>
							<div className='img-container'>
								<img src='/assets/password.svg' />
							</div>
							<input
								type='password'
								id='passwordconfirm-input'
								onChange={handlePasswordConfirmChange}
								onBlur={handlePasswordConfirmBlur}
							/>
						</div>
					</label>
				</div>

				<div id='status'>{statusText}</div>
				<button onClick={createUser}>CREATE ACCOUNT</button>
				<hr />

				<Link to='/authentication/login' className='button-like'>
					BACK TO LOG IN
				</Link>
			</div>
		</div>
	)
}
