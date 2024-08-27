import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { dialog, ipcMain } from 'electron'
import { v7 as uuidv7 } from 'uuid'
import path from 'path'

/** repository */
import { readNotesInfo, writeNoteInfo } from '@main/repository/noteInfoRepository'

/** utils */
import { handleError } from '@main/utils/handler'
import { logger } from '@main/utils/logger'
import { getResourcesDir } from '@main/utils/index'

/** asset */
import welcomeNote from '@main/resources/welcomeNote.md?asset'

/** enum */
import {
  LOG_LEVEL,
  DIALOG_TYPE,
  DialogValue,
  FILE_ENCODEING,
  WELCOME_NOTE_FILE_NAME,
  DIALOG_CANCEL_ID,
  DIALOG_DEFAULT_ID,
  INFO_MASSAGE
} from '@main/contents/enum'

/** types */
import { GetNote, NoteContent, NoteInfo } from '@main/contents/ipc'

// ファイル情報の取得
const getFileInfo = async (uuid: string): Promise<NoteInfo> => {
  const filename = `${uuid}.md`
  const [fileStats, fileStatsError] = await handleError(stat(`${getResourcesDir()}/${filename}`))

  if (fileStatsError) {
    logger(LOG_LEVEL.ERROR, `fileStats Error: ${fileStatsError}`)
    return {
      uuid: uuidv7(), // uuidを新規作成
      title: filename?.replace(/\.md$/, ''),
      lastEditTime: new Date() // デフォルトの最終編集日時
    }
  }

  return {
    uuid,
    title: filename?.replace(/\.md$/, ''),
    lastEditTime: fileStats ? new Date(fileStats.mtimeMs) : new Date()
  }
}

/**
 * ファイル取得
 */
ipcMain.handle('getNotes', async (): Promise<ReturnType<GetNote>> => {
  const rootDir = getResourcesDir()
  const [_, ensureDirError] = await handleError(ensureDir(rootDir))

  if (ensureDirError) {
    logger(LOG_LEVEL.ERROR, `ensureDir Error: ${ensureDirError}`)
  }

  const [notesFile, notesFileError] = await handleError(readNotesInfo())

  if (notesFileError) {
    logger(LOG_LEVEL.ERROR, `ensureDir Error: ${notesFileError}`)
  }

  if (!notesFile?.length) {
    logger(LOG_LEVEL.INFO, INFO_MASSAGE.NO_NOTE_FOUND)

    const content = await readFile(welcomeNote, { encoding: FILE_ENCODEING })
    await writeFile(`${rootDir}/${WELCOME_NOTE_FILE_NAME}`, content, {
      encoding: FILE_ENCODEING
    })
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

  let notes: string[] = notesFileNames!.filter(
    (fileName) => fileName.endsWith('.md') && !fileName.startsWith('README')
  )
  if (!notes.length) {
    logger(LOG_LEVEL.INFO, INFO_MASSAGE.NO_NOTE_FOUND)

    const content = await readFile(welcomeNote, { encoding: FILE_ENCODEING })
    await writeFile(`${rootDir}/${WELCOME_NOTE_FILE_NAME}`, content, {
      encoding: FILE_ENCODEING
    })
    notes = [...WELCOME_NOTE_FILE_NAME]
  }

  return Promise.all(notes.map(getFileInfo))
})

/**
 * ファイル読み込み
 */
ipcMain.handle('readNote', async (_, filename: string): Promise<NoteContent> => {
  const rootDir = getResourcesDir()

  const [readFiles, readFileError] = await handleError(
    readFile(`${rootDir}/${filename}.md`, { encoding: FILE_ENCODEING })
  )
  if (readFileError) {
    logger(LOG_LEVEL.ERROR, `readNote Error: ${readFileError}`)
    return
  }

  return readFiles
})

/**
 * ファイル書き込み
 */
ipcMain.handle('writeNote', async (_, filename: string, content: string): Promise<void> => {
  const rootDir = getResourcesDir()
  const [writeFiles, writeFileError] = await handleError(
    writeFile(`${rootDir}/${filename}.md`, content, { encoding: FILE_ENCODEING })
  )

  if (writeFileError) {
    logger(LOG_LEVEL.ERROR, `writeNote Error: ${writeFileError}`)
    return
  }

  return writeFiles
})

/**
 * ファイル新規作成
 */
ipcMain.handle('createNote', async (): Promise<NoteInfo['title'] | false> => {
  const rootDir = getResourcesDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    logger(LOG_LEVEL.INFO, INFO_MASSAGE.NOTE_CANCELED)
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: DIALOG_TYPE.ERROR,
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')

  return filename
})

/**
 * ファイル削除
 */
ipcMain.handle('deleteNote', async (_, filename: string): Promise<boolean> => {
  const rootDir = getResourcesDir()

  const { response } = await dialog.showMessageBox({
    type: DIALOG_TYPE.WARNING as DialogValue,
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0：Delete, 1：Cancel
    defaultId: DIALOG_DEFAULT_ID,
    cancelId: DIALOG_CANCEL_ID
  })

  if (response === DIALOG_CANCEL_ID) {
    console.info('Note deletion canceled')
    return false
  }

  const [__, deleteFileError] = await handleError(remove(`${rootDir}/${filename}.md`))

  if (deleteFileError) {
    logger(LOG_LEVEL.ERROR, `deleteNote Error: ${deleteFileError}`)
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)

  return true
})
