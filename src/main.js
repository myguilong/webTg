import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import router from './router'
import http from './http'
import 'amfe-flexible'
import store from './store'
import isLogin from './plugins/login'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$isLogin = isLogin
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
