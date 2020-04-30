import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import {create} from '@/utils/create'
import noticePlugin from '@/utils/noticePlugin'
// import Notice from '@/components/Notice'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// Vue.prototype.$notice = (opts) => {
//   const comp = create(Notice, opts)
//   comp.show()
//   return comp
// }

Vue.use(noticePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
