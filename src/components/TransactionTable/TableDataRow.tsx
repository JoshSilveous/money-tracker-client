import './TransactionTable.scss'
interface TransactionData {
	transaction_id: number
	name: string
	timestamp: string
	amount: number
	category_name: string
	account_name: string
}
interface TableDataRowProps {
	transactionData: TransactionData
}
export function TableDataRow({ transactionData }: TableDataRowProps) {
	if (false) {
		console.log(transactionData.transaction_id)
	}

	return (
		<tr>
			<td>{transactionData.timestamp}</td>
			<td>{transactionData.name}</td>
			<td>{transactionData.amount}</td>
			<td>{transactionData.category_name}</td>
			<td>{transactionData.account_name}</td>
		</tr>
	)
}
