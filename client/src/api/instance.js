import axios from 'axios'

const TSMInstance = axios.create()
const TSMPublicInstance = axios.create()

export function setTSMInterceptor (request, response, requestError, responseError) {
  TSMInstance.interceptors.request.use(request, requestError)

  TSMInstance.interceptors.response.use(response, (error) => Promise.reject(error.response))
}

export { TSMInstance, TSMPublicInstance }
