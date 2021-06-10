import { createStore } from 'vuex'
import random from '@/plugins/random'
import {
  refreshIdentity,
  updateIdentity,
  subscriberCheck
} from '@/api'
import { oidcSettings } from '@/config/oidc'

export default createStore({
  state: {
    user: null,
    authUser: null,
    authTimeout: null,
    subscriber: false
  },
  getters: {
    authUser: state => {
      if (state.authUser == null) {
        if (sessionStorage.user) {
          return JSON.parse(sessionStorage.user)
        }
        return null
      }
      return state.authUser
    },
    user: state => {
      return state.user
    }
  },
  mutations: {
    authUser (state, value) {
      if (value == null) {
        state.authUser = null
        sessionStorage.removeItem('user')
      } else {
        state.authUser = value
        sessionStorage.user = JSON.stringify(value)
      }
    },
    user (state, user) {
      state.user = user
    },
    subscriber (state, subscriber) {
      state.subscriber = subscriber
    },
    authTimeout (state, timeout) {
      state.authTimeout = timeout
    }
  },
  actions: {
    signin (context) {
      // generate a state value
      sessionStorage.state = random()
      // generate a nonce value
      sessionStorage.nonce = random()
      window.location = `${
        oidcSettings.authority
      }/authorize?client_id=${
        oidcSettings.client_id
      }&redirect_uri=${
        oidcSettings.redirect_uri
      }&response_type=code&scope=${oidcSettings.scope}&state=${
        sessionStorage.state
      }&nonce=${sessionStorage.nonce}`
    },
    signinCallback (context, data) {
      return updateIdentity(data.code, data.nonce)
        .then(data => {
          data.expires_at = Date.now() + (data.expires_in - 60) * 1000
          context.commit('authUser', data)
          sessionStorage.removeItem('nonce')
          sessionStorage.removeItem('state')
          return true
        })
        .catch(_ => {
          return false
        })
    },
    checkSubscriber (context) {
      return subscriberCheck()
        .then(result => {
          context.commit('subscriber', result)
          return true
        })
    },
    autoRefreshToken (context, checkTimeout) {
      if (context.getters.authUser !== null) {
        if (checkTimeout && context.state.authTimeout !== null) {
          return
        }
        const timeout = setTimeout(() => {
          if (context.getters.authUser !== null) {
            const user = context.getters.authUser
            refreshIdentity(user.refresh_token)
              .then(data => {
                user.expires_at = Date.now() + ((user.expires_in - 60) * 1000)
                user.access_token = data.access_token
                user.refresh_token = data.refresh_token
                context.commit('authUser', user)
                context.dispatch('autoRefreshToken', false)
              })
          }
        }, (60 * 60 * 1000))
        context.commit('authTimeout', timeout)
      }
    }
  },
  modules: {
  }
})
