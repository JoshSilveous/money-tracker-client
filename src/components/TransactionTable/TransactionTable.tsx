import { useEffect, useState } from 'react'

interface TransactionTableProps {
	context: Context
}

interface PageSettings {
	/**
	 * Results per page
	 */
	resPerPage: 10 | 20 | 30
	/**
	 * Page the user is currently on
	 */
	thisPage: number
	/**
	 * Which field to order retrieved data by
	 */
	orderBy: 'timestamp' | 'name' | 'category_name' | 'account_name' | 'amount'
	/**
	 * Direction to order the retrieved data by
	 */
	orderByDirection: 'ASC' | 'DESC'
}
interface RetrievedData {
	transaction_id: number
	name: string
	timestamp: string
	amount: number
	category_name: string
	account_name: string
}
export function TransactionTable({ context }: TransactionTableProps) {
	const [pageSettings, setPageSettings] = useState<PageSettings>({
		resPerPage: 10,
		thisPage: 1,
		orderBy: 'timestamp',
		orderByDirection: 'DESC',
	})
	console.log('pageSettings:', pageSettings)

	function handlePageSettingSwitch(field: PageSettings['orderBy']) {
		if (pageSettings.orderBy === field) {
			setPageSettings((prev) => ({
				...prev,
				orderByDirection:
					prev.orderByDirection === 'ASC' ? 'DESC' : 'ASC',
			}))
		} else {
			setPageSettings((prev) => ({
				...prev,
				orderBy: field,
				orderByDirection: 'DESC',
			}))
		}
	}

	const [currentData, setCurrentData] = useState<RetrievedData[]>()
	function updateData(): void {
		console.log()
		const apiUrl = 'http://localhost:3000/api/getdisplaydata'

		const data = {
			username: context.username,
			token: context.token,
			payload: pageSettings,
		}
		const headers = {
			'Content-Type': 'application/json',
		}
		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		}
		console.log('fetching with payload', pageSettings)
		console.time('fetch request finished')
		fetch(apiUrl, requestOptions)
			.then((res) => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error(res.statusText)
				}
			})
			.then((data) => {
				setCurrentData(data.displayData)
				console.timeEnd('fetch request finished')
			})
			.catch((err) => {
				console.log('error while running dev command getAccounts')
				console.error(err)
				console.timeEnd('fetch request finished')
			})
	}

	useEffect(() => {
		updateData()
	}, [pageSettings])

	console.log('Data retrieved in TransactionTable:')
	console.log(currentData)

	const tableDisplay = !currentData ? (
		<div>Loading...</div>
	) : (
		// refactor to CSS grid and make this much MUCH cleaner
		<table>
			<tr>
				<th
					style={{ cursor: 'pointer', userSelect: 'none' }}
					onClick={() => handlePageSettingSwitch('timestamp')}
				>
					{pageSettings.orderBy === 'timestamp'
						? pageSettings.orderByDirection === 'ASC'
							? '↑'
							: '↓'
						: ''}
					Date
				</th>
				<th
					style={{ cursor: 'pointer', userSelect: 'none' }}
					onClick={() => handlePageSettingSwitch('name')}
				>
					{pageSettings.orderBy === 'name'
						? pageSettings.orderByDirection === 'ASC'
							? '↑'
							: '↓'
						: ''}
					Name
				</th>
				<th
					style={{ cursor: 'pointer', userSelect: 'none' }}
					onClick={() => handlePageSettingSwitch('amount')}
				>
					{pageSettings.orderBy === 'amount'
						? pageSettings.orderByDirection === 'ASC'
							? '↑'
							: '↓'
						: ''}
					Amount
				</th>
				<th
					style={{ cursor: 'pointer', userSelect: 'none' }}
					onClick={() => handlePageSettingSwitch('category_name')}
				>
					{pageSettings.orderBy === 'category_name'
						? pageSettings.orderByDirection === 'ASC'
							? '↑'
							: '↓'
						: ''}
					Category
				</th>
				<th
					style={{ cursor: 'pointer', userSelect: 'none' }}
					onClick={() => handlePageSettingSwitch('account_name')}
				>
					{pageSettings.orderBy === 'account_name'
						? pageSettings.orderByDirection === 'ASC'
							? '↑'
							: '↓'
						: ''}
					Account
				</th>
			</tr>
			{currentData.map((data) => {
				return (
					<tr>
						<td>{data.timestamp}</td>
						<td>{data.name}</td>
						<td>{data.amount}</td>
						<td>{data.category_name}</td>
						<td>{data.account_name}</td>
					</tr>
				)
			})}
		</table>
	)

	return (
		<div>
			<button onClick={updateData}>Force Update Data</button>
			{tableDisplay}
		</div>
	)
}
