import { createReducer } from "@reduxjs/toolkit"
import getCitiesAction from '../actions/citiesActions'

const initialState = {
  cities: []
}

const citiesReducer = createReducer(
  initialState,
  (builder) => { return builder
  .addCase(
    getCitiesAction.get_cities, 
    (state, action) => {
      const newState = {... state, cities: action.payload.cities}
      return newState
  })
  .addCase(
    getCitiesAction.get_city, 
    (state, action) => {
      const newState = {... state, cities: [action.payload.cities]}
      return newState
  })
  .addCase(
    getCitiesAction.reset_city,
    (state, action) => {
      return {
        ...state,
        cities: action.payload
      }
  })  
}) 

export default citiesReducer