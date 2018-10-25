import Vue from 'vue'
import App from '@/App.vue'
import router from '@/routers'
import store from '@/store'
import * as ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'tinymce/skins/lightgray/skin.min.css'
import '@/components/styles/index.less'
import '@/styles/index.less'
import * as GlobalUI from '@/components'

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(GlobalUI)

// 全局配置
Vue.config.productionTip = false

Vue.prototype.$setBreadcrumb = val => {
  let path = ''
  val.map(item => {
    item.path = path + item.path
  })
  window.parent.postMessage(
    {
      act: 'breadcrumb',
      msg: val
    },
    '*'
  )
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
