import Axios from 'axios'

const BASE_URL = 'https://f-player.herokuapp.com/'

export const fetchIndex = async () => {
  return Axios.get(`${BASE_URL}songs/index`)
}

export const fetchSongs = async () => {
  return Axios.get(`${BASE_URL}songs/list`)
}

export const postList = async song => {
  return Axios.post(`${BASE_URL}songs`, song)
}
