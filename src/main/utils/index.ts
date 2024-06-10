import { homedir } from 'os'

/** enum */
import { APP_DIRECTORY_NAME } from '@main/contents/enum'

// 現在のディレクトリを取得
export const getHomeDir = () => {
  return `${homedir()}/${APP_DIRECTORY_NAME}`
}
