import { defineStore } from 'pinia'
import { getStore, setStore } from '@/utils/storage'
import { MagnetConfig, MetaConfig } from '@/types'

export const useConfigStore = defineStore('config', {
  state: (): {
    magnetConfigs: MagnetConfig[]
    metaConfigs: MetaConfig[]
    proxy: string
    videoUrl: string
  } => ({
    magnetConfigs: getStore('magnetConfigs') || [],
    metaConfigs: getStore('metaConfigs') || [],
    proxy: getStore('proxy') || '',
    videoUrl: getStore('videoUrl') || 'https://diancigaoshou.com'
  }),

  getters: {},

  actions: {
    reset(type: 'magnet' | 'meta', idx: number, record: any) {
      if (type === 'magnet') {
        this.magnetConfigs[idx] = record
        setStore('magnetConfigs', this.magnetConfigs)
      } else {
        this.metaConfigs[idx] = record
        setStore('metaConfigs', this.metaConfigs)
      }
    },
    setVideoUrl(url: string) {
      this.videoUrl = url
      setStore('videoUrl', url)
    },
    setProxy(url: string) {
      this.proxy = url
      setStore('proxy', url)
    }
  }
})
