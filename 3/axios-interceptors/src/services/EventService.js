import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//good to set auth tokens
//good to filter data before reaches app
//also to catch 401 not authorized responses and renew token
//not good for multiple api requests
apiClient.interceptors.request.use(config => {
  // actions.fetchEvent()
  store.dispatch('loading/startLoading')
  return config
})
apiClient.interceptors.response.use(response => {
  // actions.stopLoading()
  store.dispatch('loading/doneLoading')

  return response
})

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
