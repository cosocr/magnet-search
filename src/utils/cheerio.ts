import { Cheerio, load } from 'cheerio'
import { AnyNode } from 'domhandler'
import { MagnetConfig, Rule } from '@/types'
import { Meta, MetaConfig } from '@/types/meta'

const filterStr = (el: Cheerio<AnyNode>, rule: Rule): string => {
  if (!rule) {
    return ''
  }
  const find = el.find(rule.find)
  if (rule.remove) {
    find.find(rule.remove).remove()
  }
  let str: string = rule.type
    ? // @ts-ignore
      find[rule.type](rule.typeName)
    : // @ts-ignore
      find.text()
  str = str ? str.trim() : str
  if (rule.replace && rule.replace.length === 2) {
    str = str.replace(rule.replace[0], rule.replace[1])
  }
  return str
}

export const analyze = (html: string, config: MagnetConfig) => {
  const $ = load(html)
  const items = $(config.list.find)
    .map((i, el) => {
      const obj = config.list.object
      const url: string = filterStr($(el), obj.url)
      return {
        url: url.startsWith('http') ? url : config.host + url,
        name: filterStr($(el), obj.name),
        size: filterStr($(el), obj.size),
        config
      }
    })
    .get()
  return items
}

export const analyzeDetail = (html: string, config: MagnetConfig) => {
  const $ = load(html)
  const body = $('body')
  const name = filterStr(body, config.detail.name)
  let magnet = filterStr(body, config.detail.magnet)
  const idx = magnet.indexOf('&')
  magnet = idx > 0 ? magnet.substring(0, idx) : magnet
  return {
    name,
    magnet: `${magnet}&dn=${name}`,
    size: filterStr(body, config.detail.size),
    fileList: body
      .find(config.detail.fileList.find)
      .map((i, el) => {
        return {
          name: filterStr($(el), config.detail.fileList.object.name),
          size: filterStr($(el), config.detail.fileList.object.size)
        }
      })
      .get()
  }
}

export const analyzeMeta = (html: string, config: MetaConfig): any[] => {
  const $ = load(html)
  const items = $(config.list.find)
    .map((i, el) => {
      const obj = config.list.object
      const url: string = filterStr($(el), obj.url)
      return {
        url: url.startsWith('http') ? url : config.host + url,
        name: filterStr($(el), obj.name),
        desc: filterStr($(el), obj.desc),
        date: filterStr($(el), obj.date),
        author: filterStr($(el), obj.author),
        config
      }
    })
    .get()
  return items
}

export const analyzeMetaDetail = (html: string, config: MetaConfig): Meta => {
  const $ = load(html)
  const body = $('body')
  return {
    name: filterStr(body, config.detail.name),
    url: '',
    desc: filterStr(body, config.detail.desc),
    date: filterStr(body, config.detail.date),
    author: filterStr(body, config.detail.author),
    tags: body
      .find(config.detail.tags.find)
      .map((i, el) => {
        return $(el).text()
      })
      .get()
      .filter((val) => {
        if (!config.detail.tags.filter || config.detail.tags.filter.length === 0) {
          return true
        }
        return config.detail.tags.filter.indexOf(val) < 0
      })
  }
}
