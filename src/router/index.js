//1.导入Vue Router的核心功能
import { createRouter, createWebHistory } from 'vue-router'
//createRouter：创建路由器
//createWebHistory：让URL看起来像正常网址

//2.定义路由规则
const routes = [
  //第一条规则
  {
    path: '/',
    redirect: '/overview'
  },
  //第二条规则
  {
    path: '/overview',
    name: 'overview',
    component: () => import('../views/Overview.vue')
  },
  //第三条规则 
  {
    path: '/retrospect',
    name: 'retrospect',
    component: () => import('../views/Retrospect.vue')
  },
  //第四条规则
  {
    path: '/capability',
    name: 'capability',
    component: () => import('../views/Capability.vue')
  }
]
//3.创建路由器实例并传入路由规则
const router = createRouter({
  history: createWebHistory(),
  routes
})
//4.导出路由器实例给main.js使用
export default router