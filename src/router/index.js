import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/Home'
import login from '@/components/login'
import welcome from '@/components/welcome'
Vue.use(Router)
var router = new Router({
  routes: [{
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: welcome
    }]
  }, {
    path: '/login',
    component: login
  }]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
