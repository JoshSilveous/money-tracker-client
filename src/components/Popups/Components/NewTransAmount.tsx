import { ReactComponent as DollarIcon } from '../../../assets/dollar.svg'
import { useRef, useState } from 'react'
function NewTransAmount() {
	const inputAmountRef = useRef<HTMLInputElement>(null)
	const inputAmountDecimalRef = useRef<HTMLInputElement>(null)
	const inputAmountDirectionRef = useRef<HTMLButtonElement>(null)

	const [curAmount, setCurAmount] = useState<number | null>()

	function filterNumeric(e: React.ChangeEvent<HTMLInputElement>) {
		const inputNode = e.target as HTMLInputElement

		if (inputNode.value.includes('.')) {
			inputNode.value = inputNode.value.replace(/[^0-9]/g, '')
			inputAmountDecimalRef.current!.focus()
			inputAmountDecimalRef.current!.select()
		}

		inputNode.value = inputNode.value.replace(/[^0-9]/g, '')
	}

	function handleDirectionClick() {
		const buttonNode = inputAmountDirectionRef.current!
		const currentValue = buttonNode.value

		if (currentValue === '+') {
			buttonNode.classList.add('neg')
			buttonNode.classList.remove('pos')
			buttonNode.value = '-'
			buttonNode.innerText = '-'
		} else {
			buttonNode.classList.add('pos')
			buttonNode.classList.remove('neg')
			buttonNode.value = '+'
			buttonNode.innerText = '+'
		}
	}

	return (
		<>
			<label htmlFor='amount-input'>Amount</label>
			<label htmlFor='amount-input'>
				<div className='input-text-container'>
					<div className='svg-container'>
						<DollarIcon />
					</div>
					<button
						ref={inputAmountDirectionRef}
						className='direction neg'
						onClick={handleDirectionClick}
						value='-'
					>
						-
					</button>
					<input
						type='text'
						inputMode='numeric'
						id='amount-input'
						className='amount-input'
						ref={inputAmountRef}
						maxLength={10}
						onInput={filterNumeric}
					/>
					<div className='decimal'>.</div>
					<input
						type='text'
						inputMode='numeric'
						id='amount-input-decimal'
						className='amount-input-decimal'
						ref={inputAmountDecimalRef}
						onInput={filterNumeric}
						maxLength={2}
					/>
				</div>
			</label>
		</>
	)
}
