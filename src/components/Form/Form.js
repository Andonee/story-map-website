import { useState, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Title from '../Title/Title'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { httpRequest } from '../../utils/http-request'
import { BaseUrl } from '../../utils/baseUrl'

import styles from './Form.module.scss'

const Form = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	const authContext = useContext(AuthContext)

	const loginRef = useRef()
	const passwordRef = useRef()

	const history = useHistory()

	const onActionChangeHandler = e => {
		e.preventDefault()
		setIsLogin(!isLogin)
	}

	const onSubmitHandler = async e => {
		e.preventDefault()

		debugger

		// This is a demo app (temporary) so there is no validation
		const enteredLogin = loginRef.current.value
		const enteredPassword = passwordRef.current.value

		try {
			let url
			if (isLogin) {
				url = `${BaseUrl}/api/login`
			} else {
				url = `${BaseUrl}/api/signup`
			}
			const request = await httpRequest(url, 'POST', {
				user: enteredLogin || '',
				password: enteredPassword,
			})

			console.log(request)

			if (request.ok) {
				setErrorMessage('')
				const data = await request.json()
				authContext.login(data.token)

				// const { sub: userId } = jwt_decode(data.accessToken)
				console.log('userId', data.user, 'token', data.token)
				// fetch(`http://localhost:5001/users/${data.user}`)
				// 	.then(response => {
				// 		if (response.ok) {
				// 			const data = response.json()
				// 			return data
				// 		} else {
				// 			throw new Error()
				// 		}
				// 	})
				// .then(data => {
				console.log(data)
				authContext.user(data.user)
				history.replace(`/story-account/maps/${data.user}`)
				// })
				// .catch(err => console.log(err))
			} else {
				request.json().then(data => setErrorMessage(data.message))
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
				<h1 className={styles.form_welcome}>Witamy na Story Map</h1>
				<form className={styles.form_form} onSubmit={onSubmitHandler}>
					<input
						type='text'
						id='login'
						placeholder='Login'
						className={styles.form_form_input}
						ref={loginRef}
						required
					/>

					<input
						type='password'
						id='password'
						placeholder='Hasło'
						className={styles.form_form_input}
						ref={passwordRef}
					/>
					<p className={styles.form_form_error}>{errorMessage}</p>
					<div className={styles.form_form_actions}>
						<button>{!isLogin ? 'Utwórz nowe konto' : 'Zaloguj'}</button>
						<button onClick={onActionChangeHandler}>
							{isLogin ? 'Utwórz konto' : 'Przełącz do logowania'}
						</button>
					</div>
				</form>
			</section>
		</div>
	)
}
export default Form
