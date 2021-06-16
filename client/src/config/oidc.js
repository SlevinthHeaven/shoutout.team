function getConfig () {
  return {
    authority: 'https://id.twitch.tv/oauth2',
    client_id: process.env.VUE_APP_CLIENT_ID,
    redirect_uri: process.env.VUE_APP_REDIRECT_URI,
    popup_redirect_uri: process.env.VUE_APP_POPUP_REDIRECT_URI,
    response_type: 'token id_token',
    scope: 'openid',
    post_logout_redirect_uri: process.env.VUE_APP_POST_LOGOUT_REDIRECT_URI,
    silentRedirectUri: process.env.VUE_APP_SILENT_REDIRECT_URI,
    automaticSilentRenew: false
  }
}

export const oidcSettings = getConfig()
