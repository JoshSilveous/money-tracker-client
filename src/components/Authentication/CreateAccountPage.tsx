import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ReactComponent as UsernameIcon } from '../../assets/profile.svg'
import { ReactComponent as PasswordIcon } from '../../assets/password.svg'

export function CreateAccountPage() {
	const usernameInputRef = useRef<HTMLInputElement>(null)
	const passwordInputRef = useRef<HTMLInputElement>(null)
	const passwordConfirmInputRef = useRef<HTMLInputElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

	const MAX_INPUT_LENGTH = 30
	const MIN_INPUT_LENGTH = 8

	function setStatus(error: boolean, statusText: string) {
		if (error) {
			statusDivRef.current!.classList.add('error')
		} else {
			statusDivRef.current!.classList.remove('error')
		}
		statusDivRef.current!.innerText = statusText
	}
	function setErrors(
		errorUsername: boolean,
		errorPassword: boolean,
		errorPasswordConfirm: boolean
	) {
		if (errorUsername) {
			usernameInputRef.current!.parentElement!.classList.add('error')
		} else {
			usernameInputRef.current!.parentElement!.classList.remove('error')
		}
		if (errorPassword) {
			passwordInputRef.current!.parentElement!.classList.add('error')
		} else {
			passwordInputRef.current!.parentElement!.classList.remove('error')
		}
		if (errorPasswordConfirm) {
			passwordConfirmInputRef.current!.parentElement!.classList.add(
				'error'
			)
		} else {
			passwordConfirmInputRef.current!.parentElement!.classList.remove(
				'error'
			)
		}
	}

	function createUser() {
		// Check if password matches confirmation
		if (
			passwordInputRef.current!.value !==
			passwordConfirmInputRef.current!.value
		) {
			setStatus(true, "Password doesn't match password confirmation.")
			setErrors(false, true, true)
			return
		} else {
			setErrors(false, false, false)
		}

		// Check username length minimum
		if (usernameInputRef.current!.value.length <= MIN_INPUT_LENGTH) {
			setErrors(true, false, false)
			setStatus(
				true,
				`Username must be more than ${MIN_INPUT_LENGTH} characters in length.`
			)
			return
		} else {
			setErrors(false, false, false)
		}
		// Check password length minimum
		if (passwordInputRef.current!.value.length <= MIN_INPUT_LENGTH) {
			setErrors(false, true, false)
			setStatus(
				true,
				`Password must be more than ${MIN_INPUT_LENGTH} characters in length.`
			)
			return
		} else {
			setErrors(false, false, false)
		}

		// Make API Call
		const apiUrl = 'http://localhost:3000/api/createuser'
		const data = {
			username: usernameInputRef.current!.value,
			password: passwordInputRef.current!.value,
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
					setStatus(false, 'Account created.')
					setErrors(false, false, false)
				} else {
					throw new Error(res.statusText)
				}
			})
			.catch((err) => {
				if (err.message === 'ERROR_DUPLICATE_USERNAME') {
					setStatus(
						true,
						'Username already exists, please pick another.'
					)
					setErrors(true, false, false)
				} else if (err.message === 'ERROR_REQUEST_FORMAT') {
					setErrors(false, false, false)
					setStatus(
						true,
						'Something went wrong with your request. Please contact support.'
					)
				} else if (
					err.message ===
					'NetworkError when attempting to fetch resource.'
				) {
					setErrors(false, false, false)
					setStatus(
						true,
						"Couldn't contact server. Our server may be down, or you might not have internet connection."
					)
				} else {
					setErrors(false, false, false)
					setStatus(true, err.message)
				}
			})
	}

	// Front-end input cleaning. This is verified on the back-end as well.
	const USERNAME_FILTER = /[!@#$%^&*(){}[\]<>\/\\'\"|?=+~`:,; \t\n\r]/g
	const PASSWORD_FILTER = /[/'"`,\\ ]/g
	function filterUsername(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		let error = false

		if (inputNode.value.length > MAX_INPUT_LENGTH) {
			inputNode.value = inputNode.value.slice(0, MAX_INPUT_LENGTH)
			error = true
		}

		const cleanedValue = inputNode.value.replace(USERNAME_FILTER, '')
		if (inputNode.value !== cleanedValue) {
			inputNode.value = cleanedValue
			error = true
		}

		if (error) {
			inputNode.parentElement!.classList.add('error')
			setTimeout(() => {
				inputNode.parentElement!.classList.remove('error')
			}, 1000)
		}

		inputNode.value = cleanedValue
	}
	function filterPassword(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		let error = false

		if (inputNode.value.length > MAX_INPUT_LENGTH) {
			inputNode.value = inputNode.value.slice(0, MAX_INPUT_LENGTH)
			error = true
		}

		const cleanedValue = inputNode.value.replace(PASSWORD_FILTER, '')
		if (inputNode.value !== cleanedValue) {
			inputNode.value = cleanedValue
			error = true
		}

		if (error) {
			inputNode.parentElement!.classList.add('error')
			setTimeout(() => {
				inputNode.parentElement!.classList.remove('error')
			}, 1000)
		}

		inputNode.value = cleanedValue
	}

	return (
		<div className='create-new-account'>
			<h2>Create new account</h2>
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
								onChange={filterUsername}
								ref={usernameInputRef}
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
								onChange={filterPassword}
								ref={passwordInputRef}
							/>
						</div>
					</label>
				</div>
				<div className='form-input-container'>
					<label htmlFor='passwordconfirm-input'>
						Confirm your password
					</label>
					<label htmlFor='passwordconfirm-input'>
						<div className='input-text-container'>
							<div className='svg-container'>
								<PasswordIcon />
							</div>
							<input
								type='password'
								id='passwordconfirm-input'
								onChange={filterPassword}
								ref={passwordConfirmInputRef}
							/>
						</div>
					</label>
				</div>

				<div className='status-text' ref={statusDivRef} />
				<button onClick={createUser}>CREATE ACCOUNT</button>
				<hr />

				<Link to='/authentication/login' className='button-like'>
					BACK TO LOG IN
				</Link>
			</div>
		</div>
	)
}
