import Axios from 'axios'

const fetchVideo = async term => {
  return Axios.get('https://f-player.herokuapp.com/', {
    params: {
      term: term
    }
  })
}

const getVideoByTitle = (term) => {
  return new Promise((resolve, reject) => {
    fetchVideo(term)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error))
  })
}

export { getVideoByTitle, fetchVideo }
