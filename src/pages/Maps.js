import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import Map from '../components/Map/Map'
import styles from './Maps.module.scss'

import tempBasemap from '../assets/images/mapboxdark.png'


const Maps = () => {
	const authContext = useContext(AuthContext)
	const history = useHistory()

	const [maps, setMaps] = useState()

	useEffect(() => {
		const user = authContext.user()
		console.log('USER', user)
		localStorage.setItem('user', user)
		fetch(`http://localhost:5001/maps/${authContext.user()}`)
		.then(response => {
			if(response.ok){
				const data = response.json()
				return data
			}else{
				throw new Error()
			}
		})
		.then(data => {
			console.log(data)
			setMaps(data)
		})
		.catch(err => console.log(err))
	}, [])

	const onLogoutHandler = () => {
		authContext.logout()
		history.replace('/')
	}

	return <div className={styles.Maps}> <button className={styles.Maps_logoutBtn} onClick={onLogoutHandler}>Logout</button>

	{maps?.map(el => (
		<Map key={el.id} id={el.id} userId={el.userId} title={el.title} description={el.description} places={el.places} type={el.type} basemap={tempBasemap} />
	))}

	</div>
}

export default Maps
