import { Switch, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Maps from './pages/Maps'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/' exact>
					<Auth />
				</Route>
				<Route path='/maps'>
					<Maps />
				</Route>
			</Switch>
		</div>
	)
}

export default App
