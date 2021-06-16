import { TSMInstance } from '@/api/instance'

const url = process.env.VUE_APP_BASE_API_URL

export async function subscriberCheck () {
  const response = await TSMInstance.get(`${url}api/Subscription`)
  return response.status === 200
}
