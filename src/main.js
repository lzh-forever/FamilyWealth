import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'
import store from './store'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://192.168.43.115:8422'
// axios.defaults.baseURL = 'http://139.196.90.131:8422'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
