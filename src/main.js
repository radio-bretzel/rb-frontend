import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import SideNav from './components/sideNav.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

new Vue({
  render: h => h(SideNav),
}).$mount('#app')
