import React from 'react'
import style from './Cards.module.scss'

const Cards = ({ image, title, country}) => {
  return (
    <div className={style.countryWrapper}>
    <div className={style.countryContainer}>
      <div className={style.imageWrapper}>
        <img src={image} alt={image} />
      </div>

      <div>
        <div className={style.countryName}>{title}</div>
        <span className={style.continent}>{country}</span>
      </div>
    </div>
  </div>
  )
}

export default Cards