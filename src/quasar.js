import Vue from 'vue'

import 'quasar/dist/quasar.css'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Dialog, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: { },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
    Dialog, Notify, 
  }
 })