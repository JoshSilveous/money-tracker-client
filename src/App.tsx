import { useState } from 'react'
import { Home } from './components/Home'
import './App.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Login } from './components/Authentication/Login'
import { CreateAccount } from './components/Authentication/CreateAccount'

function App() {
	const [sessionInfo, setSessionInfo] = useState({ username: '', token: '' })
	if (!sessionInfo.token) {
		console.log(window.location.pathname)
		if (window.location.pathname !== '/authentication/login') {
			window.location.pathname = 'authentication/login'
		}
	}
	return (
		<Router>
			<h1>Money Tracker!</h1>
			{!sessionInfo.token && (
				<Routes>
					<Route
						path='/authentication/login'
						element={<Login setSessionInfo={setSessionInfo} />}
					/>
					<Route
						path='/authentication/create-account'
						element={<CreateAccount />}
					/>
				</Routes>
			)}
			{sessionInfo.token && <Home sessionInfo={sessionInfo} />}
		</Router>
	)
}

export default App
