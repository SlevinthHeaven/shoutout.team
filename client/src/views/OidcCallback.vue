<template>
  <div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'OidcCallback',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['signinCallback', 'loadSystem'])
  },
  mounted () {
    if (sessionStorage.state !== this.$route.query.state) {
      this.$router.push({ name: 'home' })
    }
    // call api to get token
    this.signinCallback({
      code: this.$route.query.code,
      nonce: sessionStorage.nonce
    }).then(result => {
      if (result) {
        this.loadSystem()
          .then(_ => {
            this.$router.push({ name: 'settings' })
          })
      } else {
        this.$router.push({ name: 'home' })
      }
    })
  }
}
</script>
