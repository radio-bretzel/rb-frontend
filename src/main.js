import Vue from 'vue'
import './plugins/vuetify'
import SideNav from './components/SideNav.vue'
import router from './router'

Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(SideNav)
}).$mount('#app')
