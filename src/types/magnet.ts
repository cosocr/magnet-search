import { Rule } from '.'

type List = {
  search: string
  find: string
  object: { name: Rule; url: Rule; size: Rule }
}
type Detail = {
  name: Rule
  size: Rule
  magnet: Rule
  fileList: {
    find: string
    object: {
      name: Rule
      size: Rule
    }
  }
}
export type MagnetConfig = {
  name: string
  host: string
  list: List
  detail: Detail
}
export type Magnet = {
  name: string
  magnet: string
  size: string
  imgList: string[]
  fileList: any[]
}
export const defaultMagnet: Magnet = {
  name: '-',
  magnet: '',
  size: '',
  imgList: [],
  fileList: []
}
