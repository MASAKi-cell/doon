import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

/** type */
import { LOG_LEVEL, LOG_MASSAGE } from './contents/enum'

/** composable */
import { logger } from './logger/index'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true, // サンドボックス
      contextIsolation: true // コンテキストの分離
    }
  })

  mainWindow.on('ready-to-show', async (): Promise<void> => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  logger(LOG_LEVEL.INFO, LOG_MASSAGE.APP_START)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', async (_, window): Promise<void> => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// NOTE: ウィンドウが全部閉じられたらアプリを終了
app.on('window-all-closed', async (): Promise<void> => {
  if (process.platform !== 'darwin') {
    // macOS 以外の場合、アプリケーションを終了する
    logger(LOG_LEVEL.INFO, LOG_MASSAGE.APP_FINISH)
    app.quit()
  }
})

const isTheLock = app.requestSingleInstanceLock()

// NOTE: 既にアプリが起動されていたら、新規に起動したアプリを終了
if (!isTheLock) {
  app.quit()
}
