import { contextBridge, ipcRenderer } from 'electron'

/** type */
import { ERROR_MASSAGE } from '../main/contents/enum'
import { CreateNote, DeleteNote, GetNote, NoteInfo, ReadNote, WriteNote } from '@main/contents/ipc'

if (!process.contextIsolated) {
  // コンテキストが分離されていない場合
  throw new Error(ERROR_MASSAGE.MUST_USE_CONTEXT_ISOLATION)
}

const getNotes = async (): Promise<ReturnType<GetNote>> => {
  return await ipcRenderer.invoke('getNotes')
}

const createNote = async (filename: string): Promise<ReturnType<CreateNote>> => {
  return ipcRenderer.invoke('createNote', filename)
}

const readNote = async (uuid: string): Promise<ReturnType<ReadNote>> => {
  return ipcRenderer.invoke('readNote', uuid)
}

const writeNote = async (note: NoteInfo): Promise<ReturnType<WriteNote>> => {
  return ipcRenderer.invoke('writeNote', note)
}

const deleteNote = async (filename: string, uuid: string): Promise<ReturnType<DeleteNote>> => {
  return ipcRenderer.invoke('deleteNote', filename, uuid)
}

// Docs: https://www.electronjs.org/docs/latest/tutorial/context-isolation/#usage-with-typescript
// contextBridgeに露出させるAPIを定義
export interface IElectronAPI {
  getNotes: typeof getNotes
  createNote: typeof createNote
  readNote: typeof readNote
  writeNote: typeof writeNote
  deleteNote: typeof deleteNote
}

try {
  // Docs: https://electronjs.org/docs/api/context-bridge
  contextBridge.exposeInMainWorld('electron', {
    getNotes,
    createNote,
    readNote,
    writeNote,
    deleteNote
  })
} catch (error) {
  console.error(error)
}
