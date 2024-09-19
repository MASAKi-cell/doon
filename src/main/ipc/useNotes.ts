import { dialog, ipcMain } from 'electron'
import { v7 as uuidv7 } from 'uuid'

/** repository */
import {
  readNotesInfo,
  saveNoteInfo,
  getNoteInfo,
  writeNoteInfo,
  deleteNoteInfo
} from '@main/repository/noteInfoRepository'

/** utils */
import { handleError } from '@main/utils/handler'
import { logger } from '@main/utils/logger'

/** enum */
import {
  LOG_LEVEL,
  DIALOG_TYPE,
  DialogValue,
  WELCOME,
  DIALOG_CANCEL_ID,
  DIALOG_DEFAULT_ID,
  INFO_MASSAGE
} from '@main/contents/enum'

/** types */
import { GetNote, NoteContent, NoteInfo } from '@main/contents/ipc'

/**
 * 全ファイルの取得
 */
ipcMain.handle('getNotes', async (): Promise<ReturnType<GetNote>> => {
  const [readNotes, readNotesError] = await handleError(readNotesInfo())

  if (readNotesError) {
    logger(LOG_LEVEL.ERROR, `ensureDir Error: ${readNotesError}`)
  }

  if (!readNotes?.length) {
    logger(LOG_LEVEL.INFO, INFO_MASSAGE.NO_NOTE_FOUND)

    const newNote: NoteInfo[] = [
      {
        uuid: uuidv7(),
        title: WELCOME.NEW_NOTE,
        content: WELCOME.WELCOME_NOTE_CONTENT,
        lastEditTime: new Date() // デフォルトの最終編集日時
      }
    ]
    const [_, saveNoteError] = await handleError(saveNoteInfo(newNote[0]))

    if (saveNoteError) {
      logger(LOG_LEVEL.ERROR, `saveNoteInfo Error: ${saveNoteError}`)
    }
    return newNote
  }
  return readNotes
})

/**
 * ファイル読み込み
 */
ipcMain.handle('readNote', async (_, uuid: string): Promise<NoteContent> => {
  const [getNote, getNoteError] = await handleError(getNoteInfo(uuid))
  if (getNoteError) {
    logger(LOG_LEVEL.ERROR, `readNote Error: ${getNoteError}`)
    return
  }
  return getNote?.content
})

/**
 * ファイル書き込み
 */
ipcMain.handle('writeNote', async (_c, note: NoteInfo): Promise<void> => {
  /** contentの一行目をtitle表示に設定する。 */
  const noteTitle = note.content?.slice(0, note.content.indexOf('\n'))
  const noteWithTitle = {
    ...note,
    title: noteTitle ?? ''
  }

  const [_, writeFileError] = await handleError(writeNoteInfo(noteWithTitle))

  if (writeFileError) {
    logger(LOG_LEVEL.ERROR, `writeNote Error: ${writeFileError}`)
    return
  }
})

/**
 * ファイル新規作成
 */
ipcMain.handle(
  'createNote',
  async (_, filename: string = '新規ノート'): Promise<NoteInfo | undefined> => {
    const newNote: NoteInfo = {
      uuid: uuidv7(),
      title: filename,
      content: WELCOME.WELCOME_NOTE_CONTENT,
      lastEditTime: new Date() // デフォルトの最終編集日時
    }
    const [__, saveNoteError] = await handleError(saveNoteInfo(newNote))

    if (saveNoteError) {
      logger(LOG_LEVEL.ERROR, `saveNoteInfo Error: ${saveNoteError}`)
    }

    logger(LOG_LEVEL.INFO, `saving note: ${filename}`)

    return newNote
  }
)

/**
 * ファイル削除
 */
ipcMain.handle('deleteNote', async (_, filename: string, uuid: string): Promise<boolean> => {
  const { response } = await dialog.showMessageBox({
    type: DIALOG_TYPE.WARNING as DialogValue,
    title: 'ノート削除',
    message: `${filename} を削除しますか?`,
    buttons: ['削除', 'キャンセル'], // 0：削除, 1：キャンセル
    defaultId: DIALOG_DEFAULT_ID,
    cancelId: DIALOG_CANCEL_ID
  })

  if (response === DIALOG_CANCEL_ID) {
    console.info(INFO_MASSAGE.NOTE_CANCELED)
    return false
  }

  const [__, deleteFileError] = await handleError(deleteNoteInfo(uuid))

  if (deleteFileError) {
    logger(LOG_LEVEL.ERROR, `DeleteNote Error: ${deleteFileError}`)
    return false
  }
  logger(LOG_LEVEL.INFO, `Deleting note: ${filename}`)

  return true
})
