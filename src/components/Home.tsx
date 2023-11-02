import React, { useState } from 'react'
import { triggerPopup } from '../popup/popup'
import { NewCategory } from './Popups/NewCategory'
import { NewAccount } from './Popups/NewAccount'
import { NewTransaction } from './Popups/NewTransaction'
import { TransactionTable } from './TransactionTable/TransactionTable'
import { DevPanel } from './Dev/DevPanel'
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

	const [showDevPanel, setShowDevPanel] = useState(false)

	return (
		<>
			<h2>Home! This must mean you're logged in!</h2>
			<p>Username: {context.username}</p>
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
					setShowDevPanel((prev) => !prev)
				}}
			>
				{showDevPanel ? 'Hide' : 'Show'} Developer Panel
			</button>
			{showDevPanel && <DevPanel context={context} />}
			<TransactionTable context={context} />
		</>
	)
}
