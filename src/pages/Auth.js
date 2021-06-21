import React from 'react'
import backgroundImage from '../assets/images/story-map-auth.jpg'

import Form from '../components/Form/Form'

import styles from './Auth.module.scss'

const Auth = () => {
	return (
		<div className={styles.auth_container}>
			<img
				className={styles.auth_img}
				src={backgroundImage}
				alt='story map auth'
			/>

			<Form />
		</div>
	)
}

export default Auth
