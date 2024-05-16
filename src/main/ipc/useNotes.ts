import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import log from 'electron-log'

/** utils */
import { handleError } from '@main/utils/handler'

/** enum */
import {
  APP_DIRECTORY_NAME,
  LOG_LEVEL,
  fileEncoding,
  welcomeNoteFilename
} from '@main/contents/enum'

/** types */
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@main/contents/ipc'

// TODO：typeORMの実装
export const useNotes = () => {
  /** 現在のディレクトリを取得 */
  const getHomeDir = () => {
    return `${homedir()}/${APP_DIRECTORY_NAME}`
  }

  /** ファイル読み込み */
  const readNote: ReadNote = async (filename: string) => {
    const rootDir = getHomeDir()

    const [readFiles, readFileError] = await handleError(
      readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
    )
    if (readFileError) {
      log.error(`readNote Error: ${readFileError}`)
      return
    }

    return readFiles
  }

  return {
    getHomeDir,
    readNote
  }
}
