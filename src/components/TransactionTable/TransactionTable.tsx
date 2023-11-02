import { useEffect, useState } from 'react'
import { TableDataRow } from './TableDataRow'
import { fetchDisplayData } from './functions/fetchDisplayData'

interface TransactionTableProps {
	context: Context
}

export function TransactionTable({ context }: TransactionTableProps) {
	const [pageSettings, setPageSettings] = useState<PageSettings>({
		resPerPage: 10,
		thisPage: 1,
		orderBy: 'timestamp',
		orderByDirection: 'DESC',
	})

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

	const [currentData, setCurrentData] = useState<DisplayTransaction[]>()
	function updateData() {
		fetchDisplayData(context.username, context.token, pageSettings).then(
			(res) => setCurrentData(res)
		)
	}
	useEffect(() => {
		updateData()
	}, [pageSettings])

	const tableDisplay = !currentData ? (
		<div>Loading...</div>
	) : (
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
			{currentData.map((data) => (
				<TableDataRow transactionData={data} />
			))}
		</table>
	)

	return (
		<div>
			<button onClick={updateData}>Force Update Data</button>
			{tableDisplay}
		</div>
	)
}
