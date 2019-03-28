import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['@/page/login'], resolve)
const admin = resolve => require(['@/page/admin'], resolve)
const clothes = resolve => require(['@/page/clothes'], resolve)
const manager = resolve => require(['@/page/manager'], resolve)
const member = resolve => require(['@/page/member'], resolve)
Vue.use(Router)

export default new Router({
  // base: '/history',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/admin',
      component: admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          redirect: 'clothes'
        },
        {
          path: 'clothes',
          component: clothes
        },
        {
          path: 'manager',
          component: manager
        },
        {
          path: 'member',
          component: member
        }
      ]
    }
  ]
})
