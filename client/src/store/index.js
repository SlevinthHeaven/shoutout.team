import Vue from 'vue'
import Vuex from 'vuex'
import random from '@/plugins/random'
import {
  refreshIdentity,
  updateIdentity,
  subscriberCheck,
  getMe,
  getSettings,
  getTeams
} from '@/api'
import { oidcSettings } from '@/config/oidc'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authUser: null,
    authTimeout: null,
    subscriber: false,
    settings: null,
    teams: null
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
    },
    teams: state => {
      return state.teams
    },
    subscriber: state => {
      return state.subscriber
    },
    settings: state => {
      return state.settings
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
    teams (state, teams) {
      state.teams = teams
    },
    subscriber (state, subscriber) {
      state.subscriber = subscriber
    },
    settings (state, settings) {
      state.settings = settings
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
    loadSystem (context) {
      return context.dispatch('getMe')
        .then(_ => context.dispatch('checkSubscriber'))
        .then(_ => context.dispatch('getSettings'))
        .then(_ => context.dispatch('getTeams'))
    },
    getTeams (context) {
      return getTeams(context.state.user.id)
        .then(teams => {
          context.commit('teams', teams)
          return true
        })
    },
    getMe (context) {
      return getMe()
        .then(user => {
          context.commit('user', user)
          return true
        })
    },
    checkSubscriber (context) {
      return subscriberCheck()
        .then(result => {
          context.commit('subscriber', result)
          return true
        })
    },
    getSettings (context) {
      return getSettings()
        .then(settings => {
          context.commit('settings', settings)
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
