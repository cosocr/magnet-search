import { Rule } from '.'

type List = {
  search: string
  find: string
  object: { name: Rule; desc: Rule; url: Rule; date: Rule; author: Rule }
}
type Detail = {
  name: Rule
  desc: Rule
  date: Rule
  author: Rule
  tags: Rule & {
    filter?: string[]
  }
}
export type MetaConfig = {
  name: string
  host: string
  list: List
  detail: Detail
}
export type Meta = {
  name: string
  url: string
  desc: string
  date: string
  author: string
  tags: string[]
}
export const defaultMeta: Meta = {
  name: '',
  url: '',
  desc: '',
  date: '',
  author: '',
  tags: []
}
