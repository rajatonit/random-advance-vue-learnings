export const namespaced = true
import NProgress from 'nprogress'

export const state = {
  apiWaitCount: 0
}

export const mutations = {
  API_LOADING(state) {
    state.apiWaitCount += 1
  },
  REMOVE_LOADING(state) {
    state.apiWaitCount -= 1
  }
}

export const actions = {
  startLoading({ commit, state }) {
    if (state.apiWaitCount == 0) {
      NProgress.start()
    }
    commit('API_LOADING')
  },
  doneLoading({ commit, state }) {
    commit('REMOVE_LOADING')
    if (state.apiWaitCount == 0) {
      NProgress.done()
    }
  }
}
