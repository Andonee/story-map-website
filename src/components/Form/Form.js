import { useState, useRef } from 'react'
import Title from '../Title/Title'

import styles from './Form.module.scss'

const Form = () => {
	const [isLogin, setisLogin] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	const emailRef = useRef()
	const passwordRef = useRef()

	const onActionChangeHandler = e => {
		e.preventDefault()
		setisLogin(!isLogin)
	}

	const onSubmitHandler = async e => {
		e.preventDefault()

		// This is a demo app (temporary) so there is no validation
		const enteredEmail = emailRef.current.value
		const enteredPassword = passwordRef.current.value

		try {
			let url
			if (isLogin) {
				url = 'http://localhost:3000/login'
			} else {
				url = 'http://localhost:3000/register'
			}
			const request = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
				}),
			})

			if (request.ok) {
				setErrorMessage('')
				const data = await request.json()
				console.log(data)
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
					<input
						type='text'
						id='login'
						placeholder='Login'
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
