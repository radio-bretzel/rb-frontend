import Vue from 'vue'
import Router from 'vue-router'
import Upload from './components/upload/Upload.vue'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    
  ]
})
