import { TSMInstance, TSMPublicInstance } from '@/api/instance'

const url = process.env.VUE_APP_BASE_API_URL

export async function getUser (userId) {
  const response = await TSMPublicInstance.get(`${url}api/User/${userId}`)
  return response.data
}

export async function getMe () {
  const response = await TSMInstance.get(`${url}api/User`)
  return response.data
}
