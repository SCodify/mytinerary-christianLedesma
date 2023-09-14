import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom';

function index({ imagen, ciudad, pais, cid }) {
  return (
    <div className="cardCity__item">
        <img src={imagen} alt=""/>
        <div className='cardCity__item__textContainer'>
          <h3>{ciudad}</h3>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            {pais}</p>
          <Link to={`/details/${cid}`} className='cardCity__btn'>View More</Link>
        </div>
    </div>
  )
}

export default index