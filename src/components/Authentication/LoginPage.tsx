import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ReactComponent as UsernameIcon } from '../../assets/profile.svg'
import { ReactComponent as PasswordIcon } from '../../assets/password.svg'
import { loginUser } from '../../api'
interface LoginPageProps {
	setSessionInfo: React.Dispatch<
		React.SetStateAction<{
			username: string
			token: string
		}>
	>
}
export function LoginPage({ setSessionInfo }: LoginPageProps) {
	const usernameInputRef = useRef<HTMLInputElement>(null)
	const passwordInputRef = useRef<HTMLInputElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

	const MAX_INPUT_LENGTH = 30

	function setStatus(error: boolean, statusText: string) {
		if (error) {
			statusDivRef.current!.classList.add('error')
		} else {
			statusDivRef.current!.classList.remove('error')
		}
		statusDivRef.current!.innerText = statusText
	}
	function setErrors(errorUsername: boolean, errorPassword: boolean) {
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
	}

	function handleLoginUser() {
		const username = usernameInputRef.current!.value
		const password = passwordInputRef.current!.value

		if (username.length === 0 && password.length === 0) {
			setErrors(true, true)
		} else if (username.length === 0) {
			setErrors(true, false)
		} else if (password.length === 0) {
			setErrors(false, true)
		} else {
			setErrors(false, false)
		}

		loginUser({ username, password })
			.then((token) => setSessionInfo({ username, token }))
			.catch((err) => {
				if (err.message === 'ERROR_INCORRECT_USERNAME') {
					setErrors(true, false)
					setStatus(
						true,
						`Username "${username}" doesn't exist in our database.`
					)
				} else if (err.message === 'ERROR_INCORRECT_PASSWORD') {
					setErrors(false, true)
					setStatus(true, 'Incorrect password.')
				} else if (
					err.message ===
					'NetworkError when attempting to fetch resource.'
				) {
					setErrors(false, false)
					setStatus(
						true,
						"Couldn't contact server. Our server may be down, or you might not have internet connection."
					)
				} else {
					setErrors(false, false)
					setStatus(true, `Unexpected server error: ${err.message}`)
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

				<div className='status-text' ref={statusDivRef} />
				<button onClick={handleLoginUser}>LOGIN</button>
				<hr />

				<Link
					to='/authentication/create-account'
					className='button-like'
				>
					CREATE ACCOUNT
				</Link>
			</div>
		</div>
	)
}
