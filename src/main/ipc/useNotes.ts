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
import { CreateNote, DeleteNote, GetNotes, NoteInfo, ReadNote, WriteNote } from '@main/contents/ipc'

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

  /** ファイル情報の取得 */
  const getFileInfo = async (filename: string): Promise<NoteInfo> => {
    const [fileStats, fileStatsError] = await handleError(stat(`${getHomeDir()}/${filename}`))

    if (fileStatsError) {
      logger(LOG_LEVEL.ERROR, `fileStats Error: ${fileStatsError}`)
    }

    return {
      title: filename.replace(/\.md$/, ''),
      lastEditTime: new Date(fileStats!.mtimeMs)
    }
  }

  /** ファイル書き込み */
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

  /** 全ファイルの取得 */
  const getNotes: GetNotes = async () => {
    const rootDir = getHomeDir()
    const [_, ensureDirError] = await handleError(ensureDir(rootDir))

    if (ensureDirError) {
      logger(LOG_LEVEL.ERROR, `ensureDir Error: ${ensureDirError}`)
    }

    const [notesFileNames, notesFileNamesError] = await handleError(
      readdir(rootDir, {
        encoding: FILE_ENCODEING,
        withFileTypes: false
      })
    )

    if (notesFileNamesError) {
      logger(LOG_LEVEL.ERROR, `ensureDir Error: ${notesFileNamesError}`)
    }

    const notes = notesFileNames!.filter((fileName) => fileName.endsWith('.md'))

    if (!notes.length) {
      console.info('No notes found, creating a welcome note')

      const content = await readFile(WELCOME_NOTE_FILE_NAME, { encoding: FILE_ENCODEING })

      await writeFile(`${rootDir}/${WELCOME_NOTE_FILE_NAME}`, content, { encoding: FILE_ENCODEING })

      notes.push(WELCOME_NOTE_FILE_NAME)
    }

    return Promise.all(notes.map((note: string) => getFileInfo(note)))
  }

  /** ファイル作成 */
  const createNote: CreateNote = async () => {
    const rootDir = getHomeDir()
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

    console.info(`Deleting note: ${filename}`)
    await remove(`${rootDir}/${filename}.md`)

    return true
  }

  return {
    getHomeDir,
    getFileInfo,
    getNotes,
    readNote,
    writeNote,
    createNote,
    deleteNote
  }
}
