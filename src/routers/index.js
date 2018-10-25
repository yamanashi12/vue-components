import Vue from 'vue'
import Router from 'vue-router'
import DemoRouter from './router-Demo'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/document',
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/examples/index').default,
      children: [...DemoRouter]
    }
  ]
})

