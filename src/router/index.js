import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/IndiaDetailed',
    name: 'IndiaDetailed',
    component: () => import('../views/IndiaDetailed.vue'),
    props: true
  },
  {
    path: '/StateDetails',
    name: 'StateDetails',
    component: () => import('../views/StateDetails.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
