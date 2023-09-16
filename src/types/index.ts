export type Rule = {
  find: string
  // 默认text
  type?: 'text' | 'attr'
  typeName?: string
  /* 移除规则，优先于取值，
  <a href="/to">
    这是超链接
    <p class="sample">连接里别的文字</p>
  </a>
  例如 remove='a p'，则会先变成
  <a href="/to">
    这是超链接
  </a>
  再通过type和typeName取值
  */
  remove?: string
  /**
   * 替换规则，在使用规则获取完字符串后，若此处有配置，会执行替换
   */
  replace?: string[]
}

export * from './magnet'
export * from './meta'
