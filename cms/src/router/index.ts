import Vue from 'vue'
import VueRouter from 'vue-router'
import { Github, Channels, Messages } from "@/views";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/cms',
  routes: [
    {
      path: '/',
      alias: '/github',
      name: 'Github',
      component: Github,
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