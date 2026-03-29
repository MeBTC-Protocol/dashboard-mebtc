import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = !app.isPackaged

// Single instance lock — prevent multiple windows opening
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) app.quit()

app.on('second-instance', () => {
  const win = BrowserWindow.getAllWindows()[0]
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(
        __dirname.replace(/[/\\]main$/, ''),
        'preload/preload.cjs'
      ),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // Externe Links im System-Browser öffnen (nicht in Electron)
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // F5 / Ctrl+R zum Neu laden (in Electron bei file:// nicht standardmäßig verfügbar)
  win.webContents.on('before-input-event', (_event, input) => {
    if (input.type === 'keyDown') {
      if (input.key === 'F5' || (input.control && input.key === 'r')) {
        win.webContents.reload()
      }
    }
  })

  // WalletConnect-Relay lehnt Origin: null (file://) ab — auf registrierte Domain setzen
  win.webContents.session.webRequest.onBeforeSendHeaders(
    {
      urls: [
        'wss://*.walletconnect.org/*',
        'https://*.walletconnect.org/*',
        'wss://*.walletconnect.com/*',
        'https://*.walletconnect.com/*',
        'https://*.reown.com/*'
      ]
    },
    (details, callback) => {
      details.requestHeaders['Origin'] = 'https://mebtc.network'
      callback({ requestHeaders: details.requestHeaders })
    }
  )

  return win
}

function setupAutoUpdater(win: BrowserWindow): void {
  if (isDev) return

  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update-downloaded')
  })

  autoUpdater.on('error', (err) => {
    console.error('[updater] Fehler beim Update-Check:', err.message)
  })

  ipcMain.handle('update-install', () => autoUpdater.quitAndInstall())

  autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(() => {
  const win = createWindow()
  setupAutoUpdater(win)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
