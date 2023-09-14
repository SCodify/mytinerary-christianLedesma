import React, { useEffect, useState } from 'react'
import Card from '../Card'
import { getAllCities } from '../../services/citiesQueris'
import './styles.css'

import { useDispatch, useSelector } from 'react-redux'
import getCitiesAction from '../../store/actions/citiesActions'

//import DB from '../../db/data.json'

function index({ slide }) {
  const dispatch = useDispatch() 

  const citiesReducerInStore = useSelector(store => store.citiesReducer.cities)

  //const [cities, setCities] = useState([])

  useEffect(
    ()=>{
      getAllCities()
      .then(data => 
        dispatch(getCitiesAction.get_cities(data))
        //setCities(data)
      )
      .catch(err => console.log(err))
    },
    [slide]
  ) 

  /*const apiFetch = () => {
    fetch('http://localhost:4000/api/cities')
    .then(res => res.json())
    .then(dataFetch => { setCities(dataFetch.cities) })
    .catch(err => console.log(err))
  }*/

  let arrObj = []

  let obtnerCuatro = () => {
      arrObj = citiesReducerInStore?.slice(slide * 4,(slide + 1) * 4)
      //arrObj = DB.slice(slide * 4,(slide + 1) * 4)
  }

  obtnerCuatro()
  
return (
    <div className='carrouserl__container'>
      <div className='cards__container'>
        {arrObj.map((elem)=><Card key={elem._id} ciudad={elem.nombre} pais={elem.pais} imagen={elem.foto} cid={elem._id}/>)}
      </div>
      <h3 className='slideCounter'>{slide + 1}/3</h3>
    </div>
  )
}

export default index