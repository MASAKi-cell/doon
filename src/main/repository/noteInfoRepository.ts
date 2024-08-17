import Database from '@main/database/index'
import { NoteInfoModel } from '@main/database/model/noteInfo'

/** types */
import { NoteInfo } from '@main/contents/ipc'

export const getNoteInfo = async () => {
  const connection = await Database.createConnection()
}

export const readNotesInfo = async (): Promise<NoteInfoModel[]> => {
  const connection = await Database.createConnection()
  return await connection
    .getRepository(NoteInfoModel)
    .createQueryBuilder('noteInfo')
    .select()
    .getMany()
}

export const writeNoteInfo = async () => {
  const connection = await Database.createConnection()
}

export const saveNoteInfo = async (noteInfo: NoteInfo) => {
  const connection = await Database.createConnection()
  connection.getRepository(NoteInfoModel).save(noteInfo)
}

export const createNoteInfo = async () => {
  const connection = await Database.createConnection()
}

export const deleteNoteOInfo = async () => {
  const connection = await Database.createConnection()
}
