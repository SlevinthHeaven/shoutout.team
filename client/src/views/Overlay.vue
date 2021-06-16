<template>
  <div v-if="show & currentAlert !== null" class="overlay">
    <div class="team-logo" v-if="currentAlert.teams.length === 1">
      <template v-for="team in currentAlert.teams">
        <div :key="team.id"><img :src="team.logo"/></div>
      </template>
    </div>
    <div class="team-logos-2" v-if="currentAlert.teams.length === 2">
      <template v-for="team in currentAlert.teams">
        <div :key="team.id"><img :src="team.logo"/></div>
      </template>
    </div>
    <div class="team-logos-3" v-if="currentAlert.teams.length === 3">
      <template v-for="team in currentAlert.teams">
        <div :key="team.id"><img :src="team.logo"/></div>
      </template>
    </div>
    <div class="team-logos-4" v-if="currentAlert.teams.length > 3">
      <template v-for="team in currentAlert.teams">
        <div :key="team.id"><img :src="team.logo"/></div>
      </template>
    </div>
    <div class="user-logo">
      <img :src="currentAlert.user.profile_image_url" height="150" width="150" />
    </div>
    <div class="text" v-html="teamText()">
    </div>
  </div>
</template>

<script>
import ChatClient from 'twitch-chat-client'
import {
  getSettingsAnon,
  getUser,
  getTeam,
  getTeams,
  doShoutout
} from '@/api'

export default {
  data () {
    return {
      settings: null,
      channel: null,
      teams: null,
      members: null,
      queue: [],
      queueInterval: null,
      runningAlert: false,
      chatClient: null,
      show: false,
      currentAlert: null,
      users: []
    }
  },
  methods: {
    load (value) {
      // check settings
      getSettingsAnon(value.channelId, value.slug)
        .then(settings => {
          this.settings = settings
          getUser(value.channelId)
            .then(user => {
              this.channel = user
              const chatClient = ChatClient.anonymous({ webSocket: true })
              chatClient.connect()
                .then(() => chatClient.waitForRegistration())
                .then(() => chatClient.join(this.channel.login))
                .then(() => {
                  chatClient.onPrivmsg((channel, user, message, msg) => {
                    const userId = msg.tags.get('user-id')
                    const contains = this.members.filter(x => x.user_id === userId)
                    if (contains.length > 0) {
                      const getUserContains = this.users.filter(x => x.id === userId)
                      if (getUserContains.length > 0) {
                        this.queue.push({
                          user: getUserContains[0],
                          teams: contains[0].teams
                        })
                      } else {
                        getUser(userId)
                          .then(userResult => {
                            this.users.push(userResult)
                            this.queue.push({
                              user: userResult,
                              teams: contains[0].teams
                            })
                          })
                      }
                    }
                  })
                  this.chatClient = chatClient
                })
            })
          getTeams(value.channelId)
            .then(teams => {
              this.teams = teams
              this.members = []
              this.teams.forEach((team) => {
                getTeam(team.id)
                  .then(teamValue => {
                    teamValue.users.forEach(user => {
                      const contains = this.members.filter(x => x.user_id === user.user_id)
                      if (contains.length > 0) {
                        contains[0].teams.push({
                          id: teamValue.id,
                          name: teamValue.team_name,
                          logo: teamValue.thumbnail_url
                        })
                      } else {
                        user.teams = []
                        user.teams.push({
                          id: teamValue.id,
                          name: teamValue.team_name,
                          logo: teamValue.thumbnail_url
                        })
                        this.members.push(user)
                      }
                    })
                  })
              })
            })
        })
    },
    playAudio () {
      if (this.settings.audio !== '') {
        this.audioPlayer = new Audio(`/audio/${this.settings.audio}`)
        this.audioPlayer.volume = 1
        const playPromise = this.audioPlayer.play()
        if (playPromise !== undefined) {
          playPromise
            .then(_ => {})
            .catch((error) => {
              throw error
            })
        }
      }
    },
    teamText () {
      switch (this.currentAlert.teams.length) {
        case 1: return `Welcome ${this.currentAlert.userName} part of the <span class="team-name">"${this.currentAlert.teams[0].name}"</span> team`
        case 2: return `Welcome ${this.currentAlert.userName} part of the <span class="team-name">"${this.currentAlert.teams[0].name}"</span> &amp; <span class="team-name">"${this.currentAlert.teams[1].name}"</span> teams`
        case 3: return `Welcome ${this.currentAlert.userName} part of the <span class="team-name">"${this.currentAlert.teams[0].name}"</span>, <span class="team-name">"${this.currentAlert.teams[1].name}"</span> &amp; <span class="team-name">"${this.currentAlert.teams[2].name}"</span> teams`
        default: return `Welcome ${this.currentAlert.userName} part of multiple teams I'm on!`
      }
    }
  },
  mounted () {
    this.queueInterval = setInterval(() => {
      if (!this.runningAlert && this.queue.length > 0) {
        this.runningAlert = true
        var item = this.queue.shift()
        this.currentAlert = item
        if (this.$route.params.channelId !== item.user.id) {
          doShoutout(this.$route.params.channelId, this.$route.params.slug, item.user.login, item.teams)
            .then(result => {
              if (result) {
                this.show = true
                this.playAudio()
                setTimeout(() => {
                  this.show = false
                  this.runningAlert = false
                  this.currentAlert = null
                }, 10000)
              } else {
                this.runningAlert = false
              }
            })
        } else {
          this.runningAlert = false
        }
      }
    }, 1000)
    this.load({ channelId: this.$route.params.channelId, slug: this.$route.params.slug })
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
        border-radius: 50px;
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
  position: absolute;
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
}
</style>
