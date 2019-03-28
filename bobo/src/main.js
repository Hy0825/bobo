// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.trim = function (val) {
  if (val === null || val === undefined) {
    return ''
  }
  return val.toString().replace(/^\s+/, '').replace(/\s+$/, '')
}
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // 这里判断用户是否登录，我例子中是验证本地存储是否有token
    var islogin = sessionStorage.getItem('islogin')
    if (!islogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
