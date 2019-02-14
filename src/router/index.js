import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/Home'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home
    },
    {
      path: '/login',
      component: login
    }
  ]
})
