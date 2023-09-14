import { createAsyncThunk } from "@reduxjs/toolkit"
import { getItinerariesByCity } from '../../services/itinerariesQueris'

const get_itineraries = createAsyncThunk('get_itineraries', async (cid) => { 
  try {
    const itineraries = await getItinerariesByCity(cid)
    .then(res => {
      return res
    })
    return {
      itineraries : [itineraries]
    }
  } catch (error) {
    console.log(error.message)    
  }
})

const getItinerariesAction = { get_itineraries}

export default getItinerariesAction