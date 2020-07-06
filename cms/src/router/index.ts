import Vue from 'vue'
import VueRouter from 'vue-router'
import { Hooks, Channels, Messages } from "@/views";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/cms',
  routes: [
    {
      path: '/',
      alias: '/hooks',
      name: 'Hooks',
      component: Hooks,
    },
    {
      path: '/channels',
      name: 'Channels',
      component: Channels,
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
    },
  ]
})