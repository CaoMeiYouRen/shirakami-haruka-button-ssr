// const env = process.env

export const NODE_ENV = process.env.NODE_ENV || ''

export const BASE_URL = process.env.BASE_URL || ''

export const HTML_TITLE = process.env.VUE_APP_HTML_TITLE || ''

export const RSS_BASE_URL = process.env.VUE_APP_RSS_BASE_URL || ''

export const BILI_UID = process.env.VUE_APP_BILI_UID || ''

export const PRIMARY_COLOR = process.env.VUE_APP_PRIMARY_COLOR || '#fff'

export const AUTHOR = process.env.VUE_APP_AUTHOR || ''

export const AUTHOR_BILI_UID = process.env.VUE_APP_AUTHOR_BILI_UID || ''

export const GITHUB_NAME = process.env.VUE_APP_GITHUB_NAME || ''

export const GITHUB_REPOSITORIE = process.env.VUE_APP_GITHUB_REPOSITORIE || ''

export const REPOSITORIE_NAME = `${GITHUB_NAME}/${GITHUB_REPOSITORIE}`

export const CDN_PATH = process.env.VUE_APP_CDN_PATH // `https://cdn.jsdelivr.net/gh/${REPOSITORIE_NAME}@latest/static`

export const GITHUB_LINK = `https://github.com/${REPOSITORIE_NAME}`

export const COPYRIGHT = process.env.VUE_APP_COPYRIGHT || ''

export const POLICE = process.env.VUE_APP_POLICE || ''

export const ICP = process.env.VUE_APP_ICP || ''