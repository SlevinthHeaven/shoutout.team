import { TSMInstance, TSMPublicInstance } from '@/api/instance'

const url = process.env.VUE_APP_BASE_SLEVINTH_API_URL

export async function getSettings () {
  const response = await TSMInstance.get(`${url}api/ShoutoutTeam`)
  return response.data
}

export async function getSettingsAnon (channelId, slug) {
  const response = await TSMPublicInstance.get(`${url}api/ShoutoutTeam/${channelId}/${slug}`)
  return response.data
}

export async function doShoutout (channelId, slug, userId, teams) {
  const response = await TSMPublicInstance.post(`${url}api/ShoutoutTeam/${channelId}/${slug}/${userId}`, teams)
  return response.data
}

export async function saveSettings (model) {
  const response = await TSMInstance.post(`${url}api/ShoutoutTeam`, model)
  return response.data
}
