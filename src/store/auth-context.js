import { createContext, useState } from 'react'

const AuthContext = createContext({
	token: '',
	isLoggedIn: false,
	login: token => {},
	logout: () => {},
	user: '',
})

export const AuthContextProvider = ({ children }) => {
	const initialToken = localStorage.getItem('token')
	const initialUser = localStorage.getItem('user')
	const [token, setToken] = useState(initialToken)
	const [user, setUser] = useState(initialUser)

	const userIsLoggedin = !!token

	const loginHandler = token => {
		setToken(token)
		localStorage.setItem('token', token)
	}

	const logoutHandler = () => {
		setToken(null)
		localStorage.removeItem('token')
	}

	const getUser = userName => {
		setUser(userName)
		return user
	}

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedin,
		login: loginHandler,
		logout: logoutHandler,
		user: getUser,
		userName: user,
	}

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export default AuthContext
