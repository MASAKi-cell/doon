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

/** ログメッセージ */
export const LOG_MASSAGE = {
  APP_START: 'アプリケーションが起動しました。',
  APP_FINISH: 'アプリケーションが閉じました。'
}

/** エラーメッセージ */
export const ERROR_MASSAGE = {
  MUST_USE_CONTEXT_ISOLATION: 'browser Windowではコンテキストの分離が必須です。'
}

/** 汎用的なメッセージ */
export const INFO_MASSAGE = {
  NO_NOTE_FOUND: 'ノートが見つかりませんでした。 新規作成します。',
  NOTE_CANCELED: 'ノートの削除をキャンセルしました。'
}

/** Note初期値 */
export const WELCOME = {
  WELCOME_NOTE_FILE_NAME: 'Welcome.md',
  WELCOME_NOTE_CONTENT: '## Welcome to Doon 👋🏻',
  NEW_NOTE: '新規ノート'
}

export const APP_DIRECTORY_NAME = 'Desktop/doon'
export const FILE_ENCODEING = 'utf8'

export const AUTE_SAVING_TIME = 3000
export const DIALOG_DEFAULT_ID = 0
export const DIALOG_CANCEL_ID = 1
