import Database from '@main/database/index'
import { NoteInfoModel } from '@main/database/model/noteInfo'

/** types */
import { NoteInfo } from '@main/contents/ipc'

export const getNoteInfo = async (uuid: string): Promise<NoteInfoModel> => {
  const connection = await Database.createConnection()
  return await connection
    .getRepository(NoteInfoModel)
    .createQueryBuilder('noteInfo')
    .where({ uuid })
    .getOneOrFail()
}

export const readNotesInfo = async (): Promise<NoteInfoModel[]> => {
  const connection = await Database.createConnection()
  return await connection
    .getRepository(NoteInfoModel)
    .createQueryBuilder('noteInfo')
    .select()
    .getMany()
}

export const writeNoteInfo = async (note: NoteInfo): Promise<void> => {
  const { uuid, content, title, lastEditTime } = note
  const connection = await Database.createConnection()
  await connection
    .getRepository(NoteInfoModel)
    .createQueryBuilder()
    .update(NoteInfoModel)
    .set({ content, title, lastEditTime })
    .where('uuid= :id', { id: uuid })
    .execute()
}

export const saveNoteInfo = async (noteInfo: NoteInfo): Promise<void> => {
  const connection = await Database.createConnection()
  connection.getRepository(NoteInfoModel).save(noteInfo)
}

export const createNoteInfo = async () => {
  const connection = await Database.createConnection()
  connection.getRepository(NoteInfoModel)
}

export const deleteNoteOInfo = async () => {}
