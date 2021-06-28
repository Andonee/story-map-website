import React from 'react'

import styles from './Map.module.scss'

// import mapboxdark from '/assets/images/mapboxdark.png'sdfd/

import { BaseUrl } from '../../utils/baseUrl'
import mapboxlight from '../../assets/images/mapboxlight.png'
import mapboxdark from '../../assets/images/mapboxdark.png'

const Map = ({
	title,
	description,
	places,
	type,
	basemap,
	id,
	user,
	onRemoveMapClickHandler,
}) => {
	const onMapClickHandler = () => {
		// const baseUrl = 'http://localhost:3001/api/maps/'
		const mapId = id

		const url = `https://app.nmaps.pl/story-map/${user}/${mapId}`

		window.open(url, '_blank')
	}

	const environment = process.env.NODE_ENV

	const brightMap =
		environment === 'development'
			? mapboxlight
			: '/story-account/assets/images/mapboxlight.png'
	const darkMap =
		environment === 'development'
			? mapboxdark
			: '/story-account/assets/images/mapboxdark.png'

	let avatar = basemap === 'bright' ? brightMap : darkMap

	console.log(process.env.NODE_ENV)

	return (
		<div className={styles.container}>
			{/* <img src={`/${mapboxdark}`} /> */}
			<button
				id={id}
				className={styles.container_closeBtn}
				onClick={onRemoveMapClickHandler}>
				X
			</button>
			<div className={styles.container_imgContainer}>
				<img
					onClick={onMapClickHandler}
					src={`${avatar}`}
					alt={title}
					className={styles.container_img}
				/>
				<div
					className={styles.container_imgInfoWrapper}
					onClick={onMapClickHandler}>
					<div className={styles.container_imgInfo}>Otwórz mapę</div>
				</div>
			</div>
			<div className={styles.container_title}>
				<h3>{title}</h3>
			</div>

			<div className={styles.container_description}>{description}</div>

			<div className={styles.container_info}>
				<p>
					Places: <strong>{places}</strong>
				</p>
				<p>
					Type: <strong>{type}</strong>
				</p>
			</div>
		</div>
	)
}

export default Map
