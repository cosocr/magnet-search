import axios from '@/utils/axios'
import { analyze, analyzeDetail } from './cheerio'
import { getStore, setStore } from './storage'
import { MagnetConfig } from '@/types'

export const search = (key: string, config: MagnetConfig) => {
  return new Promise<any[]>((RES, REJ) => {
    axios
      .get(config.host + config.list.search.replace('%s', key))
      .then((res) => {
        RES(analyze(res, config))
      })
      .catch((err) => {
        REJ(err)
        console.log(err)
      })
  })
}
export const getDetail = (item: any, config: MagnetConfig) => {
  return new Promise((RES, REJ) => {
    const cacheKey = encodeURI(`get-detail-${item.url}`)
    const cache = getStore(cacheKey)
    if (cache) {
      RES(cache)
      return
    }
    axios
      .get(item.url)
      .then((res) => {
        const result = analyzeDetail(res, config)
        if (result.name && result.magnet && result.fileList.length > 0) {
          setStore(cacheKey, result)
        }
        RES(result)
      })
      .catch((err) => {
        REJ(err)
        console.log(err)
      })
  })
}
