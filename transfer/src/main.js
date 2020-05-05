import Vue from 'vue'
import App from './components/transfer.vue'
import App2 from './view.transfer/example.vue'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './style/index.less'
Vue.use(elementUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
