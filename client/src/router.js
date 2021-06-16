import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      layout: 'login'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Settings.vue'),
    meta: {
      layout: 'default',
      requiresAuth: true
    }
  },
  {
    path: '/oidc-callback',
    name: 'oidcCallback',
    component: () => import(/* webpackChunkName: "about" */ '@/views/OidcCallback.vue'),
    meta: {
      layout: 'login'
    }
  },
  {
    path: '/overlay/:channelId/:slug',
    name: 'overlay',
    component: () => import(/* webpackChunkName: "overlay" */ '@/views/Overlay.vue'),
    meta: {
      layout: 'blank'
    }
  }
]

const router = new Router({
  mode: 'history',
  base: './',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (store.getters.authUser != null) {
      if (to.name === 'featured-chat-plus') {
        next()
      } else {
        next()
      }
    } else {
      router.push({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
