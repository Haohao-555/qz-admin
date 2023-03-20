import config from '@/setting'
// token key 值
export const TOKEN = 'token'
// token 时间戳 key 值
export const TIME_STAMP = 'timeStamp'
// 国际化保存的 key
export const LANG = 'language'
// 主题色保存的 key
export const MAIN_COLOR = 'mainColor'
// Dark
export const DARK = 'dark'
// Dark value
export const DARK_VALUE = 'dark'
// Light value
export const LIGHT_VALUE = 'light'
// tags 保存的 key
export const TAGS_VIEW = 'tagsView'
// 超时时长(毫秒) 两小时
export const TOKEN_TIMEOUT_VALUE = 24 * 3600 * 1000
// 默认色值
export const DEFAULT_COLOR = config.mainColor || '#00CED1'
// 侧栏默认色值
export const ASIDE_COLOR = config.asideColor || '#000000'
// 初始跳转页面
export const PAGE = config.home || '/home'
