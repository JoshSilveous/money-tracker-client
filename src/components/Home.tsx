import React, { useState } from 'react'
import { triggerPopup } from '../popup/popup'
import { NewCategory } from './Popups/NewCategory'
import { NewAccount } from './Popups/NewAccount'
import { NewTransaction } from './Popups/NewTransaction'
import { TransactionTable } from './TransactionTable/TransactionTable'
import { insertTestData } from './insertTestData'
interface HomeProps {
	context: Context
}
export function Home({ context }: HomeProps) {
	function newCategoryPopup() {
		triggerPopup(<NewCategory context={context} />)
	}
	function newAccountPopup() {
		triggerPopup(<NewAccount context={context} />)
	}
	function newTransactionPopup() {
		triggerPopup(<NewTransaction context={context} />)
	}
	const [devCatsList, setDevCatsList] = React.useState<CategoryLite[]>()
	const [devActsList, setDevActsList] = React.useState<AccountLite[]>()
	const [devTransactionList, setDevTransactionList] = React.useState()

	// (dev only)
	const [showDevTools, setShowDevTools] = useState(false)
	function devGetCategories(): void {
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
				setDevCatsList(data.categories)
			})
			.catch((err) => {
				console.log('error while running dev command getCategories')
				console.error(err)
			})
	}
	function devGetAccounts(): void {
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
				setDevActsList(data.accounts)
			})
			.catch((err) => {
				console.log('error while running dev command getAccounts')
				console.error(err)
			})
	}
	function devGetDisplayData(): Transaction[] | void {
		const apiUrl = 'http://localhost:3000/api/getdisplaydata'

		const data = {
			username: context.username,
			token: context.token,
			payload: {
				resPerPage: 10,
				thisPage: 1,
				orderBy: 'timestamp',
				orderByDirection: 'DESC',
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
				setDevTransactionList(
					data.displayData.map((transaction: DisplayTransaction) => {
						return (
							<tr>
								<th>{transaction.transaction_id}</th>
								<td>{transaction.name}</td>
								<td>{transaction.timestamp}</td>
								<td>{transaction.amount}</td>
								<td>{transaction.category_name}</td>
								<td>{transaction.account_name}</td>
							</tr>
						)
					})
				)
			})
			.catch((err) => {
				console.log('error while running dev command getDisplayData')
				console.error(err)
			})
	}

	React.useEffect(() => {
		devGetCategories()
		devGetAccounts()
		devGetDisplayData()
	}, [])
	// end (dev only)

	return (
		<>
			<h2>Home! This must mean you're logged in!</h2>
			<p>Username: {context.username}</p>
			<p style={{ maxWidth: '500px', wordWrap: 'break-word' }}>
				Token: {context.token}
			</p>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button onClick={newCategoryPopup}>New Category</button>
				<br />
				<button onClick={newAccountPopup}>New Account</button>
				<br />
				<button onClick={newTransactionPopup}>New Transaction</button>
			</div>
			<br />
			<button
				onClick={() => {
					setShowDevTools((prev) => !prev)
				}}
			>
				{showDevTools ? 'Hide' : 'Show'} Developer Tools
			</button>
			{showDevTools && (
				<div className='dev-panel'>
					<div className='col cat'>
						<button onClick={devGetCategories}>
							Update Category List
						</button>

						<table>
							<tr>
								<th>category_id</th>
								<th>name</th>
							</tr>
							{devCatsList
								? devCatsList.map((category: CategoryLite) => {
										return (
											<tr>
												<th>{category.category_id}</th>
												<td>{category.name}</td>
											</tr>
										)
								  })
								: ''}
						</table>
					</div>
					<div className='col act'>
						<button onClick={devGetAccounts}>
							Update Account List
						</button>

						<table>
							<tr>
								<th>account_id</th>
								<th>name</th>
							</tr>
							{devActsList
								? devActsList.map((account: AccountLite) => {
										return (
											<tr>
												<th>{account.account_id}</th>
												<td>{account.name}</td>
											</tr>
										)
								  })
								: ''}
						</table>
					</div>
					<div className='col trn'>
						<button onClick={devGetDisplayData}>
							Update Transaction List
						</button>

						<table>
							<tr>
								<th>transaction_id</th>
								<th>name</th>
								<th>timestamp</th>
								<th>amount</th>
								<th>category_name</th>
								<th>account_name</th>
							</tr>
							{devTransactionList}
						</table>
					</div>
					<div className='col'>
						<button
							onClick={() =>
								insertTestData(
									context,
									devCatsList!,
									devActsList!
								)
							}
						>
							Insert Test Data
						</button>
					</div>
				</div>
			)}
			<TransactionTable context={context} />
		</>
	)
}
