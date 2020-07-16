import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from "@/store/userStore";
import { githubStore } from "@/store/githubStore";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { userStore, githubStore },
  state: { },
  mutations: { },
  actions: { }
})
