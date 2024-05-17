/** ログ */
export const LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  QUSETION: 'question'
} as const

export const LOG_MASSAGE = {
  APP_START: 'アプリケーションが起動しました。',
  APP_FINISH: 'アプリケーションが閉じました。'
}

export const ERROR_MASSAGE = {
  MUST_USE_CONTEXT_ISOLATION: 'browser Windowではコンテキストの分離が必須です。'
}

export const APP_DIRECTORY_NAME = 'doon'
export const fileEncoding = 'utf8'
export const autoSavingTime = 3000
export const welcomeNoteFilename = 'Welcome.md'
