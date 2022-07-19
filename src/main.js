import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../node_modules/amfe-flexible/index.min.js'
import dayjs from 'dayjs'
console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'))
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
