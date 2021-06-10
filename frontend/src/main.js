import 'es6-promise/auto'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import Default from '@/layouts/Default'
import Login from '@/layouts/Login'
import Blank from '@/layouts/Blank'

import { setTSMInterceptor } from '@/api/instance'

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

const app = createApp(App)

app.component('default-layout', Default)
app.component('login-layout', Login)
app.component('blank-layout', Blank)

app.use(store)
app.use(router)

app.mount('#app')
