import React from 'react'

import styles from './Map.module.scss'

const Map = ({title, description, places, type, basemap, userId, id}) => {
  const onMapClickHandler = () => {
    const baseUrl = 'http://localhost:5001/maps/'
    const user = userId
    const mapId = id

    console.log(`${baseUrl}${user}/${mapId}`)
  }
  return (
    <div className={styles.container} onClick={onMapClickHandler}>
      <img src={basemap} alt={title} className={styles.container_img}/>
      <div className={styles.container_title}>
      <h3>{title}</h3>
      </div>

      <div className={styles.container_description}>
     {description}
      </div>

      <div className={styles.container_info}>
        <p>Places: <strong>{places}</strong></p>
        <p>Type: <strong>{type}</strong></p>
      </div>

    </div>
  )
}

export default Map
