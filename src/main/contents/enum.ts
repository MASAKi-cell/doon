/** ログ */
export const LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  QUSETION: 'question'
} as const

/** dialog */
export const DIALOG_TYPE = {
  WARNING: 'warning',
  NONE: 'none',
  INFO: 'info',
  ERROR: 'error',
  QUSETION: 'question'
} as const

export type DialogValue = (typeof DIALOG_TYPE)[keyof typeof DIALOG_TYPE]

export const LOG_MASSAGE = {
  APP_START: 'アプリケーションが起動しました。',
  APP_FINISH: 'アプリケーションが閉じました。'
}

export const ERROR_MASSAGE = {
  MUST_USE_CONTEXT_ISOLATION: 'browser Windowではコンテキストの分離が必須です。'
}

export const APP_DIRECTORY_NAME = 'doon'
export const FILE_ENCODEING = 'utf8'
export const WELCOME_NOTE_FILE_NAME = 'Welcome.md'

export const AUTE_SAVING_TIME = 3000
export const DIALOG_DEFAULT_ID = 1
export const DIALOG_CANCEL_ID = 0
