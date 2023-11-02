import { devGetCategories } from './functions/devGetCategories'
import { devGetAccounts } from './functions/devGetAccounts'
import { devGetDisplayData } from './functions/devGetDisplayData'
import { useEffect, useState } from 'react'
import { insertTestData } from './functions/insertTestData'
import './DevPanel.scss'

interface DevPanelProps {
	context: Context
}
export function DevPanel({ context }: DevPanelProps) {
	const [devCatsList, setDevCatsList] = useState<CategoryLite[]>()
	const [devActsList, setDevActsList] = useState<AccountLite[]>()
	const [devTransactionList, setDevTransactionList] =
		useState<DisplayTransaction[]>()

	type CurrentTable = 'category' | 'account' | 'transaction'
	const [currentTable, setCurrentTable] = useState<CurrentTable>('account')

	useEffect(() => {
		devGetCategories(context.username, context.token)
		devGetAccounts(context.username, context.token)
		devGetDisplayData(context.username, context.token)
	}, [])

	function updateCategories() {
		setCurrentTable('category')
		devGetCategories(context.username, context.token).then((data) =>
			setDevCatsList(data)
		)
	}
	function updateAccounts() {
		setCurrentTable('account')
		devGetAccounts(context.username, context.token).then((data) =>
			setDevActsList(data)
		)
	}
	function updateDisplayData() {
		setCurrentTable('transaction')
		devGetDisplayData(context.username, context.token).then((data) =>
			setDevTransactionList(data)
		)
	}

	return (
		<div className='dev-panel'>
			<div className='row'>
				<p>
					Token:
					<br />
					{context.token}
				</p>
			</div>
			<div className='row'>
				<div className='table-switch'>
					<button
						onClick={updateCategories}
						className={currentTable === 'category' ? 'active' : ''}
					>
						Update Category List
					</button>
					<button
						onClick={updateAccounts}
						className={currentTable === 'account' ? 'active' : ''}
					>
						Update Account List
					</button>
					<button
						onClick={updateDisplayData}
						className={
							currentTable === 'transaction' ? 'active' : ''
						}
					>
						Update Transaction List
					</button>
				</div>
				<button
					onClick={() =>
						insertTestData(context, devCatsList!, devActsList!)
					}
				>
					Insert Test Data
				</button>
			</div>
			{currentTable === 'category' && (
				<div className='table-container'>
					<table>
						<tr>
							<th>category_id</th>
							<th>name</th>
						</tr>
						{devCatsList
							? devCatsList.map((category) => {
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
			)}
			{currentTable === 'account' && (
				<div className='table-container'>
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
			)}

			{currentTable === 'transaction' && (
				<div className='table-container'>
					<table>
						<tr>
							<th>transaction_id</th>
							<th>name</th>
							<th>timestamp</th>
							<th>amount</th>
							<th>category_name</th>
							<th>account_name</th>
						</tr>
						{devTransactionList?.map((transaction) => {
							return (
								<tr>
									<td>{transaction.transaction_id}</td>
									<td>{transaction.name}</td>
									<td>{transaction.timestamp}</td>
									<td>{transaction.amount}</td>
									<td>{transaction.category_name}</td>
									<td>{transaction.account_name}</td>
								</tr>
							)
						})}
					</table>
				</div>
			)}
		</div>
	)
}
