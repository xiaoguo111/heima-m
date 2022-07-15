import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.user = payload
      localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
    }
  },
  actions: {},
  modules: {}
})
