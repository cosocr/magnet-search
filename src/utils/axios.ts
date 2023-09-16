import Axios from 'axios'
// @ts-ignore
import qs from 'qs'
// import { HttpsProxyAgent } from 'https-proxy-agent'

const axios = Axios.create({
  timeout: 20000, // 请求超时 20s
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  }
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (request) => {
    request.url = encodeURI(request.url || '')
    // eslint-disable-next-line no-console
    console.log('request', request)
    return request
  },
  (error) => Promise.reject(error)
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    }
    return Promise.reject(response)
  },
  (err) => {
    // eslint-disable-next-line no-console
    console.error('respose', err)
    return Promise.reject(err)
  }
)
export default axios
