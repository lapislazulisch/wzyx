import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../views/editor.vue')
  },
  {
    path: '/puzzle_01',
    name: 'puzzle0',
    component: () => import('../views/screen/screen_start_01.vue')
  },
  {
    path: '/puzzle_02',
    name: 'puzzle1',
    component: () => import('../views/screen/screen_start_02.vue')
  },
  {
    path: '/content_01',
    name: 'content_01',
    component: () => import('../views/screen/content/content_01.vue')
  },

]
const router = new VueRouter({
  routes
})


export default router
