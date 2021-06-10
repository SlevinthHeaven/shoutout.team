import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
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
      layout: 'blank'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
