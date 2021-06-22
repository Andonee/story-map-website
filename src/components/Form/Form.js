import { useState, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Title from '../Title/Title'
import { useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode"

import styles from './Form.module.scss'

const Form = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	const authContext = useContext(AuthContext)

	const loginRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()

	const history = useHistory()

	const onActionChangeHandler = e => {
		e.preventDefault()
		setIsLogin(!isLogin)
	}

	const onSubmitHandler = async e => {
		e.preventDefault()

		// This is a demo app (temporary) so there is no validation
		const enteredLogin = !isLogin && loginRef.current.value
		const enteredEmail = emailRef.current.value
		const enteredPassword = passwordRef.current.value

		try {
			let url
			if (isLogin) {
				url = 'http://localhost:5001/login'
			} else {
				url = 'http://localhost:5001/register'
			}
			const request = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: enteredLogin,
					email: enteredEmail || '',
					password: enteredPassword,
				}),
			})

			if (request.ok) {
				setErrorMessage('')
				const data = await request.json()
				authContext.login(data)

				const {sub: userId} = jwt_decode(data.accessToken)
				console.log('userId', userId)
				fetch(`http://localhost:5001/users/${userId}`)
				.then(response => {
					if(response.ok){
						const data = response.json()
						return data
					}else {
						throw new Error()
					}
				})
				.then(data => {

					console.log(data)
					authContext.user(data.user)
					history.replace(`/maps/${data.user}`)
				})
				.catch(err => console.log(err))

			} else {
				request.json().then(data => setErrorMessage(data))
				throw new Error('data')
			}
		} catch (err) {
			console.log('Submit error', err)
		}
	}

	return (
		<div className={styles.form}>
			<Title />

			<section className={styles.form_section}>
				<h1 className={styles.form_welcome}>Welcome to Story Map</h1>
				<form className={styles.form_form} onSubmit={onSubmitHandler}>
				{!isLogin &&	<input
						type='text'
						id='login'
						placeholder='Login'
						className={styles.form_form_input}
						ref={loginRef}
						required
					/>}
				<input
						type='email'
						id='email'
						placeholder='email'
						className={styles.form_form_input}
						ref={emailRef}
					/>
					<input
						type='password'
						id='password'
						placeholder='password'
						className={styles.form_form_input}
						ref={passwordRef}
					/>
					<p className={styles.form_form_error}>{errorMessage}</p>
					<div className={styles.form_form_actions}>
						<button>{!isLogin ? 'Create new account' : 'Login'}</button>
						<button onClick={onActionChangeHandler}>
							{isLogin ? 'Switch to create new account' : 'Switch to login'}
						</button>
					</div>
				</form>
			</section>
		</div>
	)
}
export default Form
