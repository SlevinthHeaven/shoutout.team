import { TSMPublicInstance } from '@/api/instance'

const url = process.env.VUE_APP_BASE_API_URL

export async function getTeams (userId) {
  const response = await TSMPublicInstance.get(`${url}api/Team/Channel/${userId}`)
  return response.data.data
}

export async function getTeam (teamId) {
  const response = await TSMPublicInstance.get(`${url}api/Team/${teamId}`)
  return response.data
}
