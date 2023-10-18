import { useRef } from 'react'
import { ReactComponent as NameIcon } from '../../assets/name.svg'
import { closeCurrentPopup } from '../../popup/popup'

interface NewTransactionProps {
	context: Context
}
export function NewTransaction({ context }: NewTransactionProps) {
	const inputNameRef = useRef<HTMLInputElement>(null)
	const inputDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const statusDivRef = useRef<HTMLDivElement>(null)

	function createTransaction() {}

	/* 	inputs needed:
			name
			?notes
			timestamp (seperate date + time(optional) menus)
			amount
			?category
			?account 
	*/
	return (
		<div className='new-transaction-popup'>
			<h1>New Transaction</h1>
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
				<label htmlFor='description-input'>Notes (optional)</label>
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
			<div className='status-text' ref={statusDivRef} />
			<button onClick={createTransaction}>Create Transaction</button>
		</div>
	)
}
