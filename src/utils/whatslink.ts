import { Message } from '@arco-design/web-vue'
import axios from './axios'
import { getStore, setStore } from './storage'

type LinkInfo = {
  type: string
  file_type: string
  name: string
  screenshots: { time: number; screenshot: string }[]
  count: number
  size: number
  error: string
}
export const whatsLinkInfo = (url: string): Promise<LinkInfo> => {
  return new Promise((RES, REJ) => {
    if (!url) {
      REJ(Error('url not be blank'))
      return
    }
    const linkInfo = getStore(`whatslink-${url}`)
    if (linkInfo) {
      RES(linkInfo)
      return
    }
    axios
      .get(`https://whatslink.info/api/v1/link?url=${url}`,{
        headers: {'Referer': 'https://whatslink.info/'}
      })
      .then((res: LinkInfo) => {
        // eslint-disable-next-line no-console
        console.log('whatLink:', res)
        if (!res.screenshots) {
          res.screenshots = []
        }
        if (res.error === 'quota_limited') {
          Message.error({
            content: '获取截图：请求过于频繁，请过几秒再试',
            closable: true
          })
        }
        if (res && res.type !== 'UNKNOWN' && res.screenshots.length > 0) {
          setStore(`whatslink-${url}`, res)
        }
        RES(res)
      })
      .catch((err) => {
        REJ(err)
      })
  })
}
