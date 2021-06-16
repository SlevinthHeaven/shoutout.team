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
      <template v-if="user !== null">
        <span v-text="user.display_name"></span>
        <v-avatar class="ml-2">
          <v-img :src="user.profile_image_url"></v-img>
        </v-avatar>
      </template>
    </v-app-bar>
    <v-main>
      <div v-text="subscriber"></div>
      <div v-text="user"></div>
      <div v-text="teams"></div>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user',
      'subscriber',
      'teams'
    ])
  },
  methods: {
    ...mapActions([
      'loadSystem'
    ])
  },
  mounted () {
    if (this.user == null) {
      this.loadSystem()
    }
  }
}
</script>
