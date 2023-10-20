import { useEffect, useRef, useState } from 'react'
import { ReactComponent as NameIcon } from '../../assets/name.svg'
import { closeCurrentPopup } from '../../popup/popup'

interface NewTransactionProps {
	context: Context
}
export function NewTransaction({ context }: NewTransactionProps) {
	const inputNameRef = useRef<HTMLInputElement>(null)
	const inputDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const inputAmountRef = useRef<HTMLInputElement>(null)
	const inputAmountDecimalRef = useRef<HTMLInputElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

	interface LightCategory {
		category_id: number
		name: string
	}
	interface LightAccount {
		account_id: number
		name: string
	}

	const [catList, setCatList] = useState<React.ReactNode[]>()
	const [actList, setActList] = useState<React.ReactNode[]>()

	function createTransaction() {}

	/* 	inputs needed:
			name
			?notes
			timestamp (seperate date + time(optional) menus)
			amount
			?category
			?account 
	*/

	function test(e: React.ChangeEvent<HTMLSelectElement>) {
		console.log(e.target.value)
	}

	function updateCatList() {
		const apiUrl = 'http://localhost:3000/api/getallcategories'
		const data = {
			username: context.username,
			token: context.token,
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
				setCatList(
					data.categories.map((category: LightCategory) => {
						return (
							<option value={category.category_id}>
								{category.name}
							</option>
						)
					})
				)
			})
			.catch((err) => {
				console.log('Error occured while retrieving Categories')
				console.error(err)
			})
	}

	function updateActList() {
		const apiUrl = 'http://localhost:3000/api/getallaccounts'
		const data = {
			username: context.username,
			token: context.token,
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
				setActList(
					data.accounts.map((account: LightAccount) => {
						return (
							<option value={account.account_id}>
								{account.name}
							</option>
						)
					})
				)
			})
			.catch((err) => {
				console.log('Error occured while retrieving Categories')
				console.error(err)
			})
	}

	useEffect(() => {
		updateCatList()
		updateActList()
	}, [])

	function filterNumeric(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement
		if (inputNode.value.includes('.')) {
			inputNode.value = inputNode.value.replace(/[^0-9]/g, '')
			inputAmountDecimalRef.current!.focus()
			inputAmountDecimalRef.current!.select()
		}

		inputNode.value = inputNode.value.replace(/[^0-9]/g, '')
	}

	return (
		<div className='new-transaction-popup'>
			<h1>New Transaction</h1>
			<div className='column-container'>
				<div className='column'>
					<div className='form-input-container'>
						<label htmlFor='name-input'>Transaction Name</label>
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
							Notes (optional)
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
				</div>
				<div className='column'>
					<div className='form-input-container'>
						<label htmlFor='amount-input'>Amount</label>
						<label htmlFor='amount-input'>
							<div className='input-text-container'>
								<div className='svg-container'>
									<NameIcon />
								</div>
								<input
									type='text'
									inputMode='numeric'
									id='amount-input'
									className='amount-input'
									ref={inputAmountRef}
									maxLength={10}
									onInput={filterNumeric}
								/>
								<div className='decimal'>.</div>
								<input
									type='text'
									inputMode='numeric'
									id='amount-input-decimal'
									className='amount-input-decimal'
									ref={inputAmountDecimalRef}
									onInput={filterNumeric}
									maxLength={2}
								/>
							</div>
						</label>
					</div>
					<br />
					<div className='row'>
						<div className='form-input-container'>
							<label htmlFor='category-input'>
								Category (optional)
							</label>
							<label htmlFor='category-input'>
								<select id='category-input' onChange={test}>
									{catList}
								</select>
							</label>
						</div>
						<div className='form-input-container'>
							<label htmlFor='account-input'>
								Account (optional)
							</label>
							<label htmlFor='account-input'>
								<select id='account-input' onChange={test}>
									{actList}
								</select>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className='status-text' ref={statusDivRef} />
			<button onClick={createTransaction}>Create Transaction</button>
		</div>
	)
}
