// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
import { IElectronAPI } from './index'

declare global {
  interface Window {
    electron: IElectronAPI
  }
}
