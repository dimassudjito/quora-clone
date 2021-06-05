import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data
      localStorage.setItem('user', JSON.stringify(data))
    },
    CLEAR_USER() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    login({ commit }, data) {
      commit('SET_USER', data)
    },
    logout({ commit }) {
      commit('CLEAR_USER')
    }
  },
  modules: {}
})
