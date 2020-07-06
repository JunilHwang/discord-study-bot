import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from "js-cookie";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: Cookies.get('access_token') || ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token;
    }
  },
  actions: {
  },
  modules: {
  }
})
