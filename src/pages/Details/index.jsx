import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { getCity } from '../../services/citiesQueris'
import CardDetail from '../../components/CardDetail'
import CardItinerary from '../../components/CardItinerary'
import './styles.css'

import { useDispatch, useSelector } from 'react-redux'
import getCitiesAction from '../../store/actions/citiesActions'

import getItinerariesAction from '../../store/actions/itinerariesActions'

function index() {
  const { cid } = useParams()

  const dispatch = useDispatch()
  
  const [cityReducerInStore] = useSelector(store => store.citiesReducer.cities)
  const [itinerariesReducerInStore] = useSelector(store => store.itinerariesReducer.itineraries)

  useEffect(() => {
    dispatch(getCitiesAction.reset_city())
    getCity(cid)
    .then(data =>{ 
      dispatch(getCitiesAction.get_city(data))
    })
    .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {    
      dispatch(getItinerariesAction.get_itineraries(cid))
  }, [])

  return (
    <>
      <CardDetail data={cityReducerInStore} />
      <div className='containerItineraries'>
        { itinerariesReducerInStore ? (
            itinerariesReducerInStore.map((item)=><CardItinerary 
              key={item._id} 
              titulo={item.titulo} 
              nombre={item.nombre} 
              foto={item.foto} 
              precio={item.precio} 
              duracion={item.duracion} 
              likes={item.likes}
              hashtags={item.hashtags}
              comentarios={item.comentarios}
            />)
          ) : (
            <h3 className='noResults'>There are not itineraries</h3>
          )
        }
        <Link to="/cities" className='return__btn'>Back to cities</Link>
      </div>
    </>
  )
}

export default index