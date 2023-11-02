import { useState } from 'react'
import { Home } from './components/Home'
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from './components/Authentication/LoginPage'
import { CreateAccountPage } from './components/Authentication/CreateAccountPage'

function App() {
	const [sessionInfo, setSessionInfo] = useState({ username: '', token: '' })
	if (!sessionInfo.token) {
		console.log(window.location.pathname)
		if (window.location.pathname !== '/authentication/login') {
			window.location.pathname = 'authentication/login'
		}
	}
	const context: Context = {
		username: sessionInfo.username,
		token: sessionInfo.token,
		refreshToken: (newToken: string) => {
			setSessionInfo((prev) => ({ ...prev, token: newToken }))
		},
	}
	return (
		<Router>
			<h1>Money Tracker!</h1>
			{!sessionInfo.token && (
				<Routes>
					<Route
						path='/authentication/login'
						element={<LoginPage setSessionInfo={setSessionInfo} />}
					/>
					<Route
						path='/authentication/create-account'
						element={<CreateAccountPage />}
					/>
				</Routes>
			)}
			{sessionInfo.token && <Home context={context} />}
		</Router>
	)
}

export default App
