interface Window {
  electronAPI: {
    platform: string
    onUpdateDownloaded: (cb: () => void) => void
    installUpdate: () => Promise<void>
  }
}
