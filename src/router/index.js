import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'overview',
    component: () => import('../views/Overview.vue')
  },
  {
    path: '/retrospect',
    name: 'retrospect',
    component: () => import('../views/Retrospect.vue')
  },
  {
    path: '/capability',
    name: 'capability',
    component: () => import('../views/Capability.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router