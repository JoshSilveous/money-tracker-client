import { useRef } from 'react'
import { ReactComponent as NameIcon } from '../../assets/name.svg'
import { closeCurrentPopup } from '../../popup/popup'

interface NewCategoryProps {
	context: Context
}
export function NewCategory({ context }: NewCategoryProps) {
	const inputNameRef = useRef<HTMLInputElement>(null)
	const inputDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

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

	function createCategory() {
		const name = inputNameRef.current!.value
		const description = inputDescriptionRef.current!.value

		if (name.length === 0) {
			setError(true)
			setStatus(true, 'Category Name cannot be blank.')
		} else {
			setError(false)
			setStatus(false, '')
		}

		const apiUrl = 'http://localhost:3000/api/insertcategory'
		const data = {
			username: context.username,
			token: context.token,
			payload: {
				name: name,
				description: description,
			},
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
				console.log('res recieved:', res)
				if (res.ok) {
					return res.json()
				} else {
					throw new Error(res.statusText)
				}
			})
			.then((data) => {
				console.log(data)
				setError(false)
				setStatus(
					false,
					`Category "${name}" created, category_id is ${data.newCategoryID}.`
				)
				context.refreshToken(data.refreshedToken)
			})
			.catch((err) => {
				if (err.message === 'ERROR_DUPLICATE_NAME') {
					setError(true)
					setStatus(
						true,
						`Category "${name}" already exists, please pick another name.`
					)
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
		<div className='new-category-popup'>
			<h1>New Category</h1>
			<div className='form-input-container'>
				<label htmlFor='name-input'>Category Name</label>
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
					Category Description (optional)
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
			<button onClick={createCategory}>Create Category</button>
		</div>
	)
}
