<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="login">login</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions([
      'signin'
    ]),
    login () {
      sessionStorage.login = 'default'
      this.signin()
    }
  }
}
</script>
