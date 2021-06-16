import { TSMInstance, TSMPublicInstance } from '@/api/instance'

const url = process.env.VUE_APP_BASE_API_URL
const clientId = process.env.VUE_APP_CLIENT_ID

export async function updateIdentity (code, nonce) {
  const response = await TSMPublicInstance.post(`${url}api/Identity`, {
    client_id: clientId, code, nonce
  })
  return response.data
}

export async function refreshIdentity (refreshToken) {
  const response = await TSMInstance.post(`${url}api/Identity/Refresh`, {
    client_id: clientId, refreshToken
  })
  return response.data
}
