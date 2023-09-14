import axios from 'axios'

const cities = axios.create({
    baseURL: 'http://localhost:4000'
})

export const getAllCities = async (queryParams = "") => {
    try {
        const { data } = await cities(`/api/cities${queryParams}`)
        return data.cities
    } catch (error) {
        return []
    }
}

export const getCity = async (cid) => {
    try {
        const { data } = await cities("/api/cities/" + cid) 
        return data.city
    } catch (error) {
        return []
    }
}