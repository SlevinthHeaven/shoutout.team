<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        shoutout.team
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="login"><font-awesome-icon :icon="['fab','twitch']"/>&nbsp;Login</v-btn>
    </v-app-bar>
    <v-main>
    </v-main>
    <v-footer>
      <v-btn href="https://twitch.tv/slevinthheaven" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','twitch']"/></v-btn>
      <v-btn href="https://twitter.com/s7evinth" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','twitter']"/></v-btn>
      <v-btn href="https://discord.gg/3Dr3rM3" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','discord']"/></v-btn>
      <v-btn href="https://www.linkedin.com/company/slevinthheaven" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','linkedin']"/></v-btn>
      <v-spacer></v-spacer>
      <span>&copy; 2019-2021 Slevinth Heaven Ltd</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
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
