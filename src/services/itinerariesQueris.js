import axios from 'axios'

const itineraries = axios.create({
    baseURL: 'http://localhost:4000'
})

export const getItinerariesByCity = async (cid) => {
    try {
        const { data } = await itineraries(`/api/itineraries/${cid}`)
        return data.itineraries
    } catch (error) {
        console.log("error",error);
        return []
    }
}

