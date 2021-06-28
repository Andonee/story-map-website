import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import Map from '../components/Map/Map'
import styles from './Maps.module.scss'
import StoryMapStructure from '../utils/story-map-structure.json'
import TimelineStructure from '../utils/timeline-structure.json'
import MapPreviewStructure from '../utils/map-preview-structure.json'
import { nanoid } from 'nanoid'
import { httpRequest } from '../utils/http-request'
import { BaseUrl } from '../utils/baseUrl'

const Maps = () => {
	const authContext = useContext(AuthContext)
	const history = useHistory()

	const [maps, setMaps] = useState()
	const [userName, setUserName] = useState()
	const [reload, setReload] = useState(false)

	useEffect(() => {
		// debugger
		const user = authContext.userName
		console.log('USER', user)
		setUserName(user)
		localStorage.setItem('user', user)
	}, [])

	useEffect(() => {
		if (!userName) return
		console.log('FETCH')
		fetch(`${BaseUrl}/api/mapsInfo/${userName}`)
			.then(response => {
				if (response.ok) {
					const data = response.json()
					return data
				} else {
					throw new Error()
				}
			})
			.then(data => {
				console.log(data)
				setMaps(data)
			})
			.catch(err => console.log(err))

		setReload(false)
	}, [userName, reload])

	const onLogoutHandler = () => {
		authContext.logout()
		history.replace('/story-account/')
	}

	const onStoryMapCreate = async e => {
		if (!userName) return

		debugger

		const type = e.target.id

		const structure =
			type === 'timeline' ? TimelineStructure : StoryMapStructure

		const mapId = nanoid(8)
		const newStoryMap = { ...structure }
		newStoryMap.id = mapId
		newStoryMap.type = type
		newStoryMap.belongsTo = userName

		MapPreviewStructure.id = mapId
		MapPreviewStructure.type = type
		MapPreviewStructure.belongsTo = userName

		try {
			const createMap = await httpRequest(
				`${BaseUrl}/api/maps/`,
				'POST',
				newStoryMap
			)
			const createMapPreview = await httpRequest(
				`${BaseUrl}/api/mapsInfo/`,
				'POST',
				MapPreviewStructure
			)
			if (createMap.ok && createMapPreview.ok) {
				setReload(true)
			} else {
				throw new Error('Creating story map error. Try again.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const onRemoveMapClickHandler = async e => {
		const mapId = e.target.id
		const user = authContext.user()

		const mapList = maps.filter(map => map.id !== mapId)
		setMaps(mapList)
		debugger
		try {
			const removeMap = await httpRequest(
				`${BaseUrl}/api/maps/${user}/${mapId}`,
				'DELETE'
			)
			const removeMapPreview = await httpRequest(
				`${BaseUrl}/api/mapsInfo/${mapId}`,
				'DELETE'
			)
			if (removeMap.ok && removeMapPreview.ok) {
				setReload(true)
			} else {
				throw new Error('Creating story map error. Try again.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className={styles.Maps}>
			<button className={styles.Maps_logoutBtn} onClick={onLogoutHandler}>
				Wyloguj
			</button>
			<button
				id='story map'
				className={styles.Maps_storyMap}
				onClick={onStoryMapCreate}>
				Utwórz Story Map
			</button>
			<button
				id='timeline'
				className={styles.Maps_timeline}
				onClick={onStoryMapCreate}>
				Utwórz Timeline
			</button>
			{maps?.length > 0
				? maps?.map(el => (
						<Map
							key={el.id}
							id={el.id}
							userId={el.userId}
							title={el.title}
							description={el.description}
							places={el.places}
							type={el.type}
							basemap={el.basemap}
							user={userName}
							onRemoveMapClickHandler={onRemoveMapClickHandler}
						/>
				  ))
				: 'Utwórz swoją pierwszą mapę'}
		</div>
	)
}

export default Maps
