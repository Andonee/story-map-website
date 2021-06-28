import { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/Auth'
import Maps from './pages/Maps'
import './App.css'
import AuthContext from './store/auth-context'

function App() {
	const authContext = useContext(AuthContext)
	return (
		<div className='App'>
			<Switch>
				<Route path='/story-account/' exact>
					<Auth />
				</Route>
				{authContext.isLoggedIn && (
					<Route path='/story-account/maps/:user'>
						<Maps />
					</Route>
				)}
				<Route path='/story-account/*'>
					<Redirect to='/story-account/' />
				</Route>
			</Switch>
		</div>
	)
}

export default App
