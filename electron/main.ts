import { app, BrowserWindow, shell, dialog } from 'electron'
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

function createWindow(): void {
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
}

function setupAutoUpdater(): void {
  if (isDev) return

  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Update verfügbar',
        message:
          'Eine neue Version wurde heruntergeladen. Die App wird nach dem Neustart aktualisiert.',
        buttons: ['Jetzt neu starten', 'Später']
      })
      .then(({ response }) => {
        if (response === 0) autoUpdater.quitAndInstall()
      })
  })

  autoUpdater.on('error', (err) => {
    console.error('[updater] Fehler beim Update-Check:', err.message)
  })

  autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(() => {
  createWindow()
  setupAutoUpdater()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
