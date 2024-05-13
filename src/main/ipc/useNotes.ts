/** enum */
import { APP_DIRECTORY_NAME } from '@main/contents/enum'
import { homedir } from 'os'

export const useNotes = () => {
  const getHomeDir = () => {
    return `${homedir()}/${APP_DIRECTORY_NAME}`
  }

  return {
    getHomeDir
  }
}
