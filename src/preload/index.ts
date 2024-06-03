import { contextBridge, ipcRenderer } from 'electron'

/** type */
import { ERROR_MASSAGE } from '../main/contents/enum'
import { CreateNote, DeleteNote, GetNote, ReadNote, WriteNote } from '@main/contents/ipc'

if (!process.contextIsolated) {
  // コンテキストが分離されていない場合
  throw new Error(ERROR_MASSAGE.MUST_USE_CONTEXT_ISOLATION)
}

const getNote = async (): Promise<ReturnType<GetNote>> => {
  return await ipcRenderer.invoke('getNote')
}

const createNote = async (): Promise<ReturnType<CreateNote>> => {
  return ipcRenderer.invoke('createNote')
}

const deleteNote = async (filename: string): Promise<ReturnType<DeleteNote>> => {
  return ipcRenderer.invoke('deleteNote', filename)
}

const readNote = async (filename: string): Promise<ReturnType<ReadNote>> => {
  return ipcRenderer.invoke('readNote', filename)
}

const writeNote = async (filename: string, context: string): Promise<ReturnType<WriteNote>> => {
  return ipcRenderer.invoke('writeNote', filename, context)
}

// Docs: https://www.electronjs.org/docs/latest/tutorial/context-isolation/#usage-with-typescript
// contextBridgeに露出させるAPIを定義
export interface IElectronAPI {
  getNote: typeof getNote
  createNote: typeof createNote
  deleteNote: typeof deleteNote
  readNote: typeof readNote
  writeNote: typeof writeNote
}

try {
  // Docs: https://electronjs.org/docs/api/context-bridge
  contextBridge.exposeInMainWorld('electron', {
    getNote,
    createNote,
    deleteNote,
    readNote,
    writeNote
  })
} catch (error) {
  console.error(error)
}
