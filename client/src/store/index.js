import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apollo from '@/vue-apollo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data
      localStorage.setItem('user', JSON.stringify(data))
    }
  },
  actions: {},
  modules: {}
})
