import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from "js-cookie";
import { userStore } from "@/store/userStore";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { userStore },
  state: { },
  mutations: { },
  actions: {
  }
})
