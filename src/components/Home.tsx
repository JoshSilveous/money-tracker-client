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

	// get list of categories (dev only)
	interface Category {
		category_id: number
		name: string
		description: string
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
								<td style={{ width: '200px' }}>
									{category.description}
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
	React.useEffect(() => {
		devGetCategories()
	}, [])

	return (
		<>
			<h2>Home! This must mean you're logged in!</h2>
			<p>Username: {context.username}</p>
			<p style={{ maxWidth: '500px', wordWrap: 'break-word' }}>
				Token: {context.token}
			</p>
			<button onClick={newCategoryPopup}>New Category</button>
			<br />
			<button onClick={newAccountPopup}>New Account</button>
			<br />
			<button onClick={newTransactionPopup}>New Transaction</button>
			<div>
				<button onClick={devGetCategories}>Update Category List</button>
			</div>
			<table>{devCatsList}</table>
		</>
	)
}
