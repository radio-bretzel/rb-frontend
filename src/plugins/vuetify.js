import Vue from 'vue'
import Vuetify, {VApp, // required
  VNavigationDrawer,VList,VCard,VToolbar,VListTile,VBtn} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VList,
    VCard,
    VToolbar,
    VListTile,
    VBtn
  },
})
