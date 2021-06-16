import 'es6-promise/auto'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'

import Default from '@/layouts/Default'
import Login from '@/layouts/Login'
import Blank from '@/layouts/Blank'

import { setTSMInterceptor } from '@/api/instance'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitch, faDiscord, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTwitch)
library.add(faDiscord)
library.add(faTwitter)
library.add(faLinkedin)

// used to remove the loading state and display it accordingly
function stopTsmLoading (data) {
  store.dispatch('setTsmLoading', false)
  return data
}

setTSMInterceptor(config => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${store.getters.authUser.id_token}`
    }
  }
}, data => data, stopTsmLoading, stopTsmLoading)

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('default-layout', Default)
Vue.component('login-layout', Login)
Vue.component('blank-layout', Blank)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
