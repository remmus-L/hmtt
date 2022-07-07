import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
import ToutiaoIcon from './components/ToutiaoIcon.vue'

// 一次性把filter/index.js中所有的按需导出   全部导出来
import * as obj from '@/filters'
import FollowUser from '@/components/FollowUser.vue'
// 下面这一行是引入全局注册的index.js
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('ToutiaoIcon', ToutiaoIcon)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.component(FollowUser.name, FollowUser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
