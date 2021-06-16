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
      <v-container fluid>
        <v-row dense v-if="user !== null">
          <v-col cols="12">
            <div class="text-h5">
              You
            </div>
          </v-col>
        </v-row>
        <v-row dense v-if="user !== null">
          <v-col cols="12">
            <v-card class="mx-auto mb-12">
              <v-img
                height="250"
                :src="user.profile_image_url"
              ></v-img>
              <v-card-title v-text="user.display_name">
              </v-card-title>
              <v-card-text v-text="subscriberText">
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <div class="text-h5">
              Your Teams
            </div>
          </v-col>
        </v-row>
        <v-row dense v-if="teams !== null && teams.length > 0">
          <template v-for="team in teams">
            <v-col :key="team.id" cols="4">
              <v-card class="mx-auto mb-12">
                <v-img
                  height="250"
                  :src="team.thumbnail_url"
                ></v-img>
                <v-card-title v-text="team.team_display_name">
                </v-card-title>
                <v-card-text v-text="team.info">
                </v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
        <v-row dense v-else>
          <v-col>
            <p>You aren't part of any teams at this time</p>
          </v-col>
        </v-row>
        <v-row dense v-if="teams !== null && teams.length > 0">
          <v-col cols="12">
            <div class="text-h5">
              The Overlay
            </div>
          </v-col>
        </v-row>
        <v-row dense v-if="user !== null && teams !== null && teams.length > 0">
          <v-col cols="12">
            <div class="overlay">
                <div class="team-logo">
                  <div><img :src="teams[0].thumbnail_url"/></div>
                </div>
                <div class="user-logo">
                  <img :src="user.profile_image_url" height="150" width="150" />
                </div>
                <div class="text" v-html="overlayText">
                </div>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user',
      'subscriber',
      'teams'
    ]),
    subscriberText () {
      if (this.subscriber) {
        return 'You are currently a subsciber of SlevinthHeaven on Twitch, we will be offering a customisation system soon for those who subscibe to our Twitch channel. This is currently limited to shoutout.team however as we create more services these will be included.'
      }
      return 'You are currently not a subsciber of SlevinthHeaven on Twitch, we will be offering a customisation system soon for those who subscibe to our Twitch channel. This is currently limited to shoutout.team however as we create more services these will be included.'
    },
    overlayText () {
      return `Welcome ${this.user.display_name} part of the <span class="team-name">"${this.teams[0].team_display_name}"</span> team`
    }
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>
<style lang="scss" scoped>
.overlay {
  .team-logo {
    > div {
      img {
        width: 150px;
        height: 150px;
      }
      width: 150px;
      height: 150px;
      position: absolute;
    }
    position: relative;
    width: 150px;
    height: 150px;
    float: left;
  }
  .team-logos-2 {
    > div {
      &:first-child {
        top:0;
        left:0;
      }
      &:last-child {
        bottom:0;
        right:0;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      width: 100px;
      height: 100px;
      position: absolute;
    }
    position: relative;
    width: 150px;
    height: 150px;
    float: left;
  }
  .team-logos-3 {
    > div {
      &:first-child {
        top:0;
        left:0;
      }
      &:last-child {
        bottom:0;
        right:32px;
      }
      &:nth-child(2){
        top:0;
        right:0;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      width: 100px;
      height: 100px;
      position: absolute;
    }
    position: relative;
    width: 150px;
    height: 150px;
    float: left;
  }
  .team-logos-4 {
    > div {
      &:first-child {
        top:0;
        left:0;
      }
      &:nth-child(2){
        top:0;
        right:0;
      }
      &:nth-child(3){
        bottom:0;
        left:0;
      }
      &:last-child {
        bottom:0;
        right:0;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      width: 100px;
      height: 100px;
      position: absolute;
    }
    position: relative;
    width: 150px;
    height: 150px;
    float: left;
  }
  .user-logo {
    position: relative;
    width: 150px;
    height: 150px;
    float: left;
  }
  .text {
    .team-name {
      white-space: nowrap;
    }
    width:300px;
    // height:150px;
    position: relative;
    float: left;
    color: #F0F0FF;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    line-height: 25px;
    padding:10px;
    align-self: center;
    text-align: center;
  }
  //position: absolute;
  top:0;
  left:0;
  padding:8px;
  background-color: #000000;
  display: grid;
  grid-template-columns: 150px 150px 300px;
  height: 166px;
  border-bottom: solid 8px #9146FF;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  max-width: 616px;
}
</style>
