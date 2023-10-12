import { useState } from 'react'
import { Home } from './components/Home'
import './App.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Login } from './components/Login'
import { CreateAccount } from './components/CreateAccount'

function App() {
	const [sessionInfo, setSessionInfo] = useState({ username: '', token: '' })
	const needsLogin = sessionInfo.username === '' && sessionInfo.token === ''
	if (needsLogin) {
		console.log(window.location.pathname)
		if (window.location.pathname !== '/authentication/login') {
			window.location.pathname = 'authentication/login'
		}
	}
	return (
		<Router>
			<h1>Money Tracker!</h1>
			<Routes>
				<Route path='/authentication/login' element={<Login />} />
				<Route
					path='/authentication/create-account'
					element={<CreateAccount />}
				/>
				<Route path='/' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
