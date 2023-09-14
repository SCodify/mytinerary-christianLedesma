import React, { useEffect, useState } from 'react'
import { getAllCities } from '../../services/citiesQueris'

import CardCity from '../../components/CardCity'
import SearchBar from '../../components/SearchBar'
import imgCities from '/page_cities.jpg'
import './styles.css'

import { useDispatch, useSelector } from 'react-redux'
import getCitiesAction from '../../store/actions/citiesActions'

function index() {
  const dispatch = useDispatch()

  const runGetAllCities = () => {
    getAllCities()
    .then(data => {
      dispatch(getCitiesAction.get_cities(data))
    })
    .catch(err => console.log(err))
  }
  
  const citiesReducerInStore = useSelector(store => store.citiesReducer.cities)
  
  useEffect(
    ()=>{
      runGetAllCities()
    },
    []
  ) 

  const handleFormSubmit = (value) => {
    if(value) {
      getAllCities(value)
      .then(res => 
        dispatch(getCitiesAction.get_cities(res))
      )
      .catch(err => console.log(err))
    } else {
      runGetAllCities()
    }
  }
  return (
    <>
      <div className='containerCitiesPage'>
        <img className='img__citiesPage' src={imgCities} alt="" />
        <div className='centerContentCitiesPage'>
          <div className='containerCitiesPage__text'>
            <h2>Cities</h2>
            <h3>
              Collection of the most beatifull <br />
              pleaces and experience
            </h3>
          </div>
        </div>
      </div>
      <SearchBar onSubmitProp={ handleFormSubmit }/>
      <div className='container__cardCities'>
        { citiesReducerInStore.length > 0 ? (
            citiesReducerInStore.map((item)=><CardCity key={item._id} ciudad={item.nombre} pais={item.pais} imagen={item.foto} cid={item._id}/>) 
          ) : (
            <h2 className='noResults'>No results found</h2>
          )
        }
      </div>
    </>
  )
}

export default index