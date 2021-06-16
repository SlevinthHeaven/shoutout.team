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
      <v-container fluid>
        <v-row dense v-if="user !== null">
          <v-col cols="12">
            <div class="text-h5">
              Welcome to shoutout.team
            </div>
          </v-col>
        </v-row>
        <v-row dense v-if="user !== null">
          <v-col cols="12">
            <div>
              <p>A way for you as a Twitch broadcaster and Twitch Team member to automoatically shoutout your fellow Twitch Team colleagues.
                shoutout.team includes an overlay to go into your choice of broadcast software and a Chat bot called ShoutoutTeam announcing the arrival in chat of any team members.</p>
              <p>At this present time shoutout.team will shoutout a Team Member once every 12 hours, this is meant to allow for a one shoutout per day, depending on when you stream.
                At a later date we will be working on a system that clears previous shoutouts at the end of your stream.</p>
              <p>We are working on a customisation system which will be available to subscribers of SlevinthHeaven on Twitch and as we create more broadcaster tools in the future,
                these will be included in the subscription</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
