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
    ...mapActions(['signinCallback', 'checkSubscriber'])
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
        this.checkSubscriber()
          .then(_ => {
            this.$router.push({ name: 'about' })
          })
      } else {
        this.$router.push({ name: 'home' })
      }
    })
  }
}
</script>
