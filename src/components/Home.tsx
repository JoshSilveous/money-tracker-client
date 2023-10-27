import React from 'react'
import { triggerPopup } from '../popup/popup'
import { NewCategory } from './Popups/NewCategory'
import { NewAccount } from './Popups/NewAccount'
import { NewTransaction } from './Popups/NewTransaction'
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
	const [devCatsList, setDevCatsList] = React.useState()
	const [devActsList, setDevActsList] = React.useState()
	const [devTransactionList, setDevTransactionList] = React.useState()

	// (dev only)
	interface Category {
		category_id: number
		name: string
	}
	interface Account {
		account_id: number
		name: string
	}
	interface Transaction {
		transaction_id: number
		name: string
		timestamp: string
		amount: number
		category_name: string
		account_name: string
	}
	function devGetCategories(): Category[] | void {
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
				setDevCatsList(
					data.categories.map((category: Category) => {
						return (
							<tr>
								<th style={{ width: '20px' }}>
									{category.category_id}
								</th>
								<td style={{ width: '100px' }}>
									{category.name}
								</td>
							</tr>
						)
					})
				)
			})
			.catch((err) => {
				console.log('error while running dev command getCategories')
				console.error(err)
			})
	}
	function devGetAccounts(): Category[] | void {
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
				setDevActsList(
					data.accounts.map((account: Account) => {
						return (
							<tr>
								<th style={{ width: '20px' }}>
									{account.account_id}
								</th>
								<td style={{ width: '100px' }}>
									{account.name}
								</td>
							</tr>
						)
					})
				)
			})
			.catch((err) => {
				console.log('error while running dev command getAccounts')
				console.error(err)
			})
	}

	function devGetDisplayData(): Transaction[] | void {
		const apiUrl = 'http://localhost:3000/api/getdisplaydata'

		/* 
		Example Data Structure
		{
			username: newUserCredentials.username,
			token: token,
			payload: {
				resPerPage: 10,
				thisPage: 1,
				orderBy: 'timestamp',
				orderByDirection: 'DESC',
			},
		}
		*/
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
					data.displayData.map((transaction: Transaction) => {
						return (
							<tr>
								<th style={{ width: '15px' }}>
									{transaction.transaction_id}
								</th>
								<td style={{ width: '100px' }}>
									{transaction.name}
								</td>
								<td style={{ width: '60px' }}>
									{transaction.timestamp}
								</td>
								<td style={{ width: '30px' }}>
									{transaction.amount}
								</td>
								<td style={{ width: '80px' }}>
									{transaction.category_name}
								</td>
								<td style={{ width: '80px' }}>
									{transaction.account_name}
								</td>
							</tr>
						)
					})
				)
			})
			.catch((err) => {
				console.log('error while running dev command getAccounts')
				console.error(err)
			})
	}
	React.useEffect(() => {
		devGetCategories()
		devGetAccounts()
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
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<button onClick={devGetCategories}>Update Category List</button>

				<table
					style={{
						backgroundColor: 'var(--input_border_color)',
						textAlign: 'left',
						paddingLeft: '10px',
					}}
				>
					<tr>
						<th>category_id</th>
						<th>name</th>
					</tr>
					{devCatsList}
				</table>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<button onClick={devGetAccounts}>Update Account List</button>

				<table
					style={{
						backgroundColor: 'var(--input_border_color)',
						textAlign: 'left',
						paddingLeft: '10px',
					}}
				>
					<tr>
						<th>account_id</th>
						<th>name</th>
					</tr>
					{devActsList}
				</table>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<button onClick={devGetDisplayData}>
					Update Transaction List
				</button>

				<table
					style={{
						backgroundColor: 'var(--input_border_color)',
						textAlign: 'left',
						paddingLeft: '10px',
						width: '1000px',
					}}
				>
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
		</>
	)
}
