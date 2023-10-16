import React from 'react'
import { triggerPopup } from '../popup/popup'
import { NewCategory } from './Popups/NewCategory'
interface HomeProps {
	context: Context
}
export function Home({ context }: HomeProps) {
	function newCategoryPopup() {
		triggerPopup(<NewCategory context={context} />)
	}
	return (
		<>
			<h2>Home! This must mean you're logged in!</h2>
			<p>Username: {context.username}</p>
			<p style={{ maxWidth: '500px', wordWrap: 'break-word' }}>
				Token: {context.token}
			</p>
			<button onClick={newCategoryPopup}>New Category</button>
		</>
	)
}
