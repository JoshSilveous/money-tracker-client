import { useEffect, useRef, useState } from 'react'
import { ReactComponent as NameIcon } from '../../assets/name.svg'
import { ReactComponent as DollarIcon } from '../../assets/dollar.svg'
import { closeCurrentPopup, triggerPopup } from '../../popup/popup'
import { NewAccount } from './NewAccount'
import { NewCategory } from './NewCategory'

interface NewTransactionProps {
	context: Context
}
export function NewTransaction({ context }: NewTransactionProps) {
	const inputNameRef = useRef<HTMLInputElement>(null)
	const inputDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const inputAmountRef = useRef<HTMLInputElement>(null)
	const inputAmountDecimalRef = useRef<HTMLInputElement>(null)
	const selectAccountRef = useRef<HTMLSelectElement>(null)
	const selectCategoryRef = useRef<HTMLSelectElement>(null)
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
					<div className='form-input-container short'>
						<label htmlFor='amount-input'>Amount</label>
						<label htmlFor='amount-input'>
							<div className='input-text-container'>
								<div className='svg-container'>
									<DollarIcon />
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
					<div className='form-input-container short'>
						<label htmlFor='category-input'>
							Category (optional)
						</label>
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
					<br />
					<div className='form-input-container short'>
						<label htmlFor='account-input'>
							Account (optional)
						</label>
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
					<input type='date'></input>
				</div>
			</div>
			<div className='status-text' ref={statusDivRef} />
			<button onClick={createTransaction}>Create Transaction</button>
		</div>
	)
}
