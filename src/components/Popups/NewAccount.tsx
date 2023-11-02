import { useEffect, useRef } from 'react'
import { ReactComponent as NameIcon } from '../../assets/name.svg'
import { closeCurrentPopup } from '../../popup/popup'
import { insertAccount } from '../../api'

interface NewAccountProps {
	context: Context
	handleCreate?: (category_id: number) => void
}
export function NewAccount({ context, handleCreate }: NewAccountProps) {
	const inputNameRef = useRef<HTMLInputElement>(null)
	const inputDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		inputNameRef.current!.focus()
	}, [])

	function setError(inputName?: boolean) {
		if (inputName) {
			inputNameRef.current!.parentElement!.classList.add('error')
		} else {
			inputNameRef.current!.parentElement!.classList.remove('error')
		}
	}
	function setStatus(error: boolean, statusText: string) {
		if (error) {
			statusDivRef.current!.classList.add('error')
		} else {
			statusDivRef.current!.classList.remove('error')
		}
		statusDivRef.current!.innerText = statusText
	}

	function createAccount() {
		const name = inputNameRef.current!.value
		const description = inputDescriptionRef.current!.value

		if (name.length === 0) {
			setError(true)
			setStatus(true, 'Account Name cannot be blank.')
		} else {
			setError(false)
			setStatus(false, '')
		}

		const newAccount = {
			name: name,
			description: description,
		}
		insertAccount(context, newAccount)
			.then((account_id) => {
				setError(false)
				setStatus(
					false,
					`Account "${name}" created, account_id is ${account_id}.`
				)
				if (handleCreate) {
					handleCreate(account_id)
					closeCurrentPopup()
				}
			})
			.catch((err) => {
				if (err.message === 'ERROR_DUPLICATE_NAME') {
					setError(true)
					setStatus(
						true,
						`Account "${name}" already exists, please pick another name.`
					)
				} else if (err.message === 'ERROR_TOKEN_EXPIRED') {
					setError(false)
					setStatus(
						true,
						'Your session has expired. Redirecting you to the login page.'
					)
					setTimeout(() => {
						console.log('timeout triggered')
						window.location.pathname = 'authentication/login'
					}, 1500)
				} else if (
					err.message ===
					'NetworkError when attempting to fetch resource.'
				) {
					setError(false)
					setStatus(
						true,
						"Couldn't contact server. Our server may be down, or you might not have internet connection."
					)
				} else {
					setError(false)
					setStatus(true, `Unexpected server error: ${err.message}`)
				}
			})
	}

	return (
		<div className='new-account-popup'>
			<h1>New Account</h1>
			<div className='form-input-container'>
				<label htmlFor='name-input'>Account Name</label>
				<label htmlFor='name-input'>
					<div className='input-text-container'>
						<div className='svg-container'>
							<NameIcon />
						</div>
						<input
							type='text'
							id='name-input'
							ref={inputNameRef}
							maxLength={32}
						/>
					</div>
				</label>
			</div>
			<br />

			<div className='form-input-container'>
				<label htmlFor='description-input'>
					Account Description (optional)
				</label>
				<label htmlFor='description-input'>
					<div className='input-textarea-container'>
						<textarea
							id='description-input'
							ref={inputDescriptionRef}
							maxLength={400}
						/>
					</div>
				</label>
			</div>
			<div className='status-text' ref={statusDivRef} />
			<button onClick={createAccount}>Create Account</button>
		</div>
	)
}
