import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { dialog } from 'electron'
import { homedir } from 'os'

/** utils */
import { handleError } from '@main/utils/handler'
import { logger } from '@main/utils/logger'

/** enum */
import {
  APP_DIRECTORY_NAME,
  LOG_LEVEL,
  DIALOG_TYPE,
  DialogValue,
  FILE_ENCODEING,
  WELCOME_NOTE_FILE_NAME,
  DIALOG_CANCEL_ID,
  DIALOG_DEFAULT_ID
} from '@main/contents/enum'

/** types */
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@main/contents/ipc'

// TODO：typeORMに変更する
export const useNotes = () => {
  /** 現在のディレクトリを取得 */
  const getHomeDir = () => {
    return `${homedir()}/${APP_DIRECTORY_NAME}`
  }

  /** ファイル読み込み */
  const readNote: ReadNote = async (filename: string) => {
    const rootDir = getHomeDir()

    const [readFiles, readFileError] = await handleError(
      readFile(`${rootDir}/${filename}.md`, { encoding: FILE_ENCODEING })
    )
    if (readFileError) {
      logger(LOG_LEVEL.ERROR, `readNote Error: ${readFileError}`)
      return
    }

    return readFiles
  }

  /** ファイル読み込み */
  const writeNote: WriteNote = async (filename, content) => {
    const rootDir = getHomeDir()
    const [writeFiles, writeFileError] = await handleError(
      writeFile(`${rootDir}/${filename}.md`, content, { encoding: FILE_ENCODEING })
    )

    if (writeFileError) {
      logger(LOG_LEVEL.ERROR, `writeNote Error: ${writeFileError}`)
      return
    }

    return writeFiles
  }

  /** ファイル削除 */
  const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getHomeDir()

    const { response } = await dialog.showMessageBox({
      type: DIALOG_TYPE.WARNING as DialogValue,
      title: 'Delete note',
      message: `Are you sure you want to delete ${filename}?`,
      buttons: ['Delete', 'Cancel'], // 0：Cancel, 1：Delete
      defaultId: DIALOG_DEFAULT_ID,
      cancelId: DIALOG_CANCEL_ID
    })

    if (response === DIALOG_CANCEL_ID) {
      console.info('Note deletion canceled')
      return false
    }

    const [_, deleteFileError] = await handleError(remove(`${rootDir}/${filename}.md`))

    if (deleteFileError) {
      logger(LOG_LEVEL.ERROR, `deleteNote Error: ${deleteFileError}`)
      return false
    }
    return true
  }

  return {
    getHomeDir,
    readNote,
    writeNote,
    deleteNote
  }
}
