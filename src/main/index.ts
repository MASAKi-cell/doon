import { app, shell, BrowserWindow, ipcMain, crashReporter } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

/** type */
import { LOG_LEVEL, LOG_MASSAGE } from './contents/enum'

/** composable */
import { logger } from './utils/logger'

function createWindow(): void {
  // windowを作成
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    center: true, // 中央配置
    title: 'Doon NoteBook',
    vibrancy: 'appearance-based', // macOS ウインドウに曇ガラスのエフェクトの設定
    visualEffectState: 'active', // macOS ウインドウの動作状態を設定
    titleBarStyle: 'hidden', // タイトルバーを隠す
    titleBarOverlay: true, // ウィンドウコントロールオーバーレイ
    trafficLightPosition: { x: 15, y: 10 }, // フレームレスウインドウの信号機ボタンのカスタム位置を設定
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

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// クラッシュレポート
crashReporter.start({
  uploadToServer: false
})

// 初期化処理、ブラウザウィンドウのセッティング
app.whenReady().then(() => {
  logger(LOG_LEVEL.INFO, LOG_MASSAGE.APP_START)

  try {
    // セットアップ
    electronApp.setAppUserModelId('com.electron')

    // see： https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', async (_, window): Promise<void> => {
      optimizer.watchWindowShortcuts(window)
    })

    // IPCテスト
    ipcMain.on('ping', () => console.log('pong'))

    createWindow()

    app.on('activate', function () {
      //  (macOS用)
      // ウィンドウが1つも無いときにドックのアイコンを押したらウィンドウを出す
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  } catch (error: any) {
    logger(LOG_LEVEL.ERROR, `Error while creating dev environment: ${error}`)

    app.quit()
  }
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
