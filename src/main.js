import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App'
import store from './store'
import router from './router'
import Message from 'vue-m-message'

// import 'normalize.css/normalize.css'

import '@/permission' // 权限路由
import '@/directive/permission' // 全局自定义指令
import _ from 'lodash'

Vue.prototype._ = _

Vue.use(Message)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
