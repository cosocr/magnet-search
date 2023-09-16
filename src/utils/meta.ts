import { Meta, MetaConfig } from '@/types/meta'
import axios from './axios'
import { analyzeMeta, analyzeMetaDetail } from './cheerio'
import { getStore, setStore } from './storage'

export const searchMeta = (key: string, config: MetaConfig) => {
  return new Promise<any[]>((RES, REJ) => {
    const url = config.host + config.list.search.replace('%s', key)
    const cacheKey = encodeURI(`get-meta-list-${url}`)
    const cache = getStore(cacheKey)
    if (cache) {
      RES(cache)
      return
    }
    axios
      .get(url)
      .then((res) => {
        const list = analyzeMeta(res, config)
        if (list && list.length > 0) {
          setStore(cacheKey, list)
        }
        RES(list)
      })
      .catch((err) => {
        REJ(err)
      })
  })
}

export const getMetaDetail = (item: Meta, config: MetaConfig) => {
  return new Promise<Meta>((RES, REJ) => {
    const cacheKey = encodeURI(`get-meta-detail-${item.url}`)
    const cache = getStore(cacheKey)
    if (cache) {
      RES(cache)
      return
    }
    axios
      .get(item.url)
      .then((res) => {
        const result = analyzeMetaDetail(res, config) || {}
        result.url = item.url
        if (result.name && result.author) {
          setStore(cacheKey, result)
        }
        RES(result)
      })
      .catch((err) => {
        REJ(err)
      })
  })
}
