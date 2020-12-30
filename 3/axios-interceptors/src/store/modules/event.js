import EventService from '@/services/EventService.js'

export const namespaced = true
export const state = {
  todos: [{ id: 1, text: '...', done: true }],
  events: [],
  eventsTotal: 0,
  event: {}
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, total) {
    state.eventsTotal = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  // createEvent({ commit, dispatch, rootState }, event) {
  createEvent({ commit, dispatch }, event) {
    // console.log('User creating Event is ' + rootState.user.user.name)
    //actions,mutations and getters are on global namespace

    //call another namespace action
    //null is payload //look for action at root of store. not in current module
    // dispatch('moduleName/actionToCall', null, { root: true })

    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notifcation = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notifcation, { root: true })
      })
      .catch(err => {
        const notifcation = {
          type: 'error',
          message: 'There was a problem creating your event: ' + err.message
        }
        dispatch('notification/add', notifcation, { root: true })
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        console.log('Total events are ' + response.headers['x-total-count'])
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(err => {
        const notifcation = {
          type: 'error',
          message: 'There was a problem fetching event: ' + err.message
        }
        dispatch('notification/add', notifcation, { root: true })
        // console.log('There was an error', err.response)
        throw err
      })
  },
  fetchEvent({ commit, getters, state, dispatch }, id) {
    if (id == state.event.id) {
      return state.event
    }
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notifcation = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notifcation, { root: true })
        })
    }
  }
}
// export const getters = {
//   catLength: state => {
//     return state.categories.length
//   },
//   doneTodos: state => {
//     return state.todos.filter(todo => todo.done)
//   },
//   activeTodosCount: state => {
//     return state.todos.filter(todo => !todo.done).length
//   },
//   getEventById: state => id => {
//     return state.events.find(event => event.id === id)
//   }
// }

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
