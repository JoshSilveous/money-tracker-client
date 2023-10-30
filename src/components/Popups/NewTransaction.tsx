import { useEffect, useRef, useState } from 'react'
import { ReactComponent as NameIcon } from '../../assets/name.svg'
import { ReactComponent as MinusIcon } from '../assets/minus.svg'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { closeCurrentPopup, triggerPopup } from '../../popup/popup'
import { NewAccount } from './NewAccount'
import { NewCategory } from './NewCategory'

interface NewTransactionProps {
	context: Context
}
export function NewTransaction({ context }: NewTransactionProps) {
	const inputNameRef = useRef<HTMLInputElement>(null)
	const inputNotesRef = useRef<HTMLTextAreaElement>(null)
	const inputDateRef = useRef<HTMLInputElement>(null)
	const selectAccountRef = useRef<HTMLSelectElement>(null)
	const selectCategoryRef = useRef<HTMLSelectElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

	function setStatus(error: boolean, statusText: string) {
		if (error) {
			statusDivRef.current!.classList.add('error')
		} else {
			statusDivRef.current!.classList.remove('error')
		}
		statusDivRef.current!.innerText = statusText
	}

	useEffect(() => {
		const currentDate = new Date()
		const year = currentDate.getFullYear()
		const month = String(currentDate.getMonth() + 1).padStart(2, '0')
		const day = String(currentDate.getDate()).padStart(2, '0')

		inputDateRef.current!.value = `${year}-${month}-${day}`
		inputNameRef.current!.focus()

		updateCatList()
		updateActList()
	}, [])

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

	function createTransaction() {
		const valName = inputNameRef.current!.value
		const valAmount =
			inputAmountRef.current!.value +
			'.' +
			inputAmountDecimalRef.current!.value.padEnd(2, '0')
		const valCategory = selectCategoryRef.current!.value
		const valAccount = selectAccountRef.current!.value
		const valDate = inputDateRef.current!.value
		const valNotes = inputNotesRef.current!.value

		let error = false
		if (!valName) {
			error = true
			inputNameRef.current!.parentElement!.classList.add('error')
		} else {
			inputNameRef.current!.parentElement!.classList.remove('error')
		}

		if (valAmount === '.00') {
			error = true
			inputAmountRef.current!.parentElement!.classList.add('error')
		} else {
			inputAmountRef.current!.parentElement!.classList.remove('error')
		}

		if (!valDate) {
			error = true
			inputDateRef.current!.parentElement!.classList.add('error')
		} else {
			inputDateRef.current!.parentElement!.classList.remove('error')
		}
		if (!error) {
			const apiUrl = 'http://localhost:3000/api/inserttransaction'
			const data = {
				username: context.username,
				token: context.token,
				payload: {
					name: valName,
					timestamp: valDate,
					notes: valNotes,
					amount: parseInt(valAmount),
					category_id: valCategory ? parseInt(valCategory) : null,
					account_id: valAccount ? parseInt(valAccount) : null,
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
					if (res.ok) {
						return res.json()
					} else {
						throw new Error(res.statusText)
					}
				})
				.then((data) => {
					setStatus(
						false,
						`Category "${valName}" created, transaction_id is ${data.transaction_id}.`
					)
					console.log(data)
					context.refreshToken(data.refreshedToken)
				})
				.catch((err) => {
					if (err.message === 'ERROR_TOKEN_EXPIRED') {
						setStatus(
							true,
							'Your session has expired. Redirecting you to the login page.'
						)
						setTimeout(() => {
							window.location.pathname = 'authentication/login'
						}, 1500)
					} else if (
						err.message ===
						'NetworkError when attempting to fetch resource.'
					) {
						setStatus(
							true,
							"Couldn't contact server. Our server may be down, or you might not have internet connection."
						)
					} else {
						setStatus(
							true,
							`Unexpected server error: ${err.message}`
						)
					}
				})
		}
	}

	// -------- Account List Functions --------
	const [pendingNewAct, setPendingNewAct] = useState(false)

	useEffect(() => {
		if (pendingNewAct) {
			setTimeout(() => {
				// timeout used due to issues detecting new option immediately after re-render
				selectAccountRef.current!.selectedIndex =
					selectAccountRef.current!.options.length - 2
				setPendingNewAct(false)
			}, 100)
		}
	}, [pendingNewAct])

	let prevActInx = 0
	function handleAccountChange(e: React.ChangeEvent<HTMLSelectElement>) {
		if (e.target.value === 'new') {
			e.target.selectedIndex = prevActInx
			function handleCreate() {
				setPendingNewAct(true)
				updateActList()
			}
			triggerPopup(
				<NewAccount context={context} handleCreate={handleCreate} />
			)
		} else {
			prevActInx = e.target.selectedIndex
		}
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
				console.log('Error occured while retrieving Accounts')
				console.error(err)
			})
	}

	// -------- Account List Functions --------
	//
	//
	// -------- Category List Functions --------

	const [pendingNewCat, setPendingNewCat] = useState(false)

	useEffect(() => {
		if (pendingNewCat) {
			setTimeout(() => {
				// timeout used due to issues detecting new option immediately after re-render
				selectCategoryRef.current!.selectedIndex =
					selectCategoryRef.current!.options.length - 2
				setPendingNewCat(false)
			}, 100)
		}
	}, [pendingNewCat])

	let prevCatInx = 0
	function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
		if (e.target.value === 'new') {
			e.target.selectedIndex = prevCatInx
			function handleCreate() {
				setPendingNewCat(true)
				updateCatList()
			}
			triggerPopup(
				<NewCategory context={context} handleCreate={handleCreate} />
			)
		} else {
			prevCatInx = e.target.selectedIndex
		}
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

	// -------- Category List Functions --------

	return (
		<div className='new-transaction-popup'>
			<h1>New Transaction</h1>
			<div className='form-container'>
				<div className='form-input-container name'>
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
				<div className='form-input-container amount'>
					<label htmlFor='amount-input'>Amount</label>
					<label htmlFor='amount-input'>
						<div className='input-text-container'>
							<div className='svg-container'>
								<DollarIcon />
							</div>
							<button
								ref={inputAmountDirectionRef}
								className='direction neg'
								onClick={handleDirectionClick}
								value='-'
							>
								-
							</button>
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
				<div className='form-input-container category'>
					<label htmlFor='category-input'>Category (optional)</label>
					<label htmlFor='category-input'>
						<select
							id='category-input'
							onChange={handleCategoryChange}
							ref={selectCategoryRef}
						>
							<option value='' />
							{catList}
							<option value='new'>Create New Category</option>
						</select>
					</label>
				</div>
				<div className='form-input-container account'>
					<label htmlFor='account-input'>Account (optional)</label>
					<label htmlFor='account-input'>
						<select
							id='account-input'
							onChange={handleAccountChange}
							ref={selectAccountRef}
						>
							<option value='' />
							{actList}
							<option value='new'>Create New Account</option>
						</select>
					</label>
				</div>
				<div className='form-input-container date'>
					<label htmlFor='date-input'>Date</label>
					<label htmlFor='date-input' className='label-container'>
						<div className='input-text-container'>
							<input
								type='date'
								id='date-input'
								ref={inputDateRef}
							></input>
						</div>
					</label>
				</div>
				<div className='form-input-container notes'>
					<label htmlFor='description-input'>Notes (optional)</label>
					<label
						htmlFor='description-input'
						className='label-container'
					>
						<div className='input-textarea-container'>
							<textarea
								id='description-input'
								ref={inputNotesRef}
								maxLength={400}
							/>
						</div>
					</label>
				</div>
			</div>
			<div className='status-text' ref={statusDivRef} />
			<button onClick={createTransaction}>Create Transaction</button>
		</div>
	)
}
