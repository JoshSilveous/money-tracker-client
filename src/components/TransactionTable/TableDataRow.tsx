import './TransactionTable.scss'
interface TableDataRowProps {
	transactionData: DisplayTransaction
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
