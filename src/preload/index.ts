import { contextBridge } from 'electron'

/** type */
import { ERROR_MASSAGE } from '../main/contents/enum'

if (!process.contextIsolated) {
  // コンテキストが分離されていない場合
  throw new Error(ERROR_MASSAGE.MUST_USE_CONTEXT_ISOLATION)
}

// NOTE:
// https://www.electronjs.org/docs/latest/tutorial/context-isolation/#usage-with-typescript
// contextBridgeに露出させるAPIを定義
export interface IElectronAPI {}

try {
  contextBridge.exposeInMainWorld('electron', {})
} catch (error) {
  console.error(error)
}
