import React from 'react'
import { triggerPopup } from '../popup/popup'
import { NewCategory } from './Popups/NewCategory'
interface HomeProps {
	sessionInfo: { username: string; token: string }
}
export function Home({ sessionInfo }: HomeProps) {
	function buttonHandle() {
		triggerPopup(<NewCategory sessionInfo={sessionInfo} />)
	}

	return (
		<>
			<h2>Home! This must mean you're logged in!</h2>
			<p>Username: {sessionInfo.username}</p>
			<p style={{ maxWidth: '500px', wordWrap: 'break-word' }}>
				Token: {sessionInfo.token}
			</p>
			<button onClick={buttonHandle}>Popup!</button>
		</>
	)
}
