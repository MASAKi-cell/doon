import Database from '@main/database/index'
import { DataSource } from 'typeorm'

import { NoteInfoModel } from '@main/database/model/noteInfo'

/** types */
import { NoteInfo } from '@main/contents/ipc'

export const saveNoteInfo = async (noteInfo: NoteInfo) => {
  ;(await Database.createConnection()).getRepository(NoteInfoModel).save(noteInfo)
}
