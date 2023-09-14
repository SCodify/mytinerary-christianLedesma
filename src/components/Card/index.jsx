import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom';

function index({ imagen, ciudad, pais, cid }) {
  return (
    <Link to={`/details/${cid}`} className="card__item">
        <img src={imagen} alt=""/>
        <div className='card__item__textContainer'>
          <h3>{ciudad}</h3>
          <small>{pais}</small>
        </div>
    </Link>
  )
}

export default index