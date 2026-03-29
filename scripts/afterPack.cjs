const fs = require('fs')
const path = require('path')

exports.default = async function (context) {
  if (context.electronPlatformName !== 'linux') return

  const executableName = context.packager.executableName
  const appOutDir = context.appOutDir
  const binaryPath = path.join(appOutDir, executableName)
  const wrappedPath = path.join(appOutDir, `${executableName}.bin`)

  fs.renameSync(binaryPath, wrappedPath)

  const wrapper = [
    '#!/bin/bash',
    `exec "$(dirname "$(readlink -f "$0")")/${executableName}.bin" --no-sandbox "$@"`,
    ''
  ].join('\n')

  fs.writeFileSync(binaryPath, wrapper)
  fs.chmodSync(binaryPath, 0o755)
}
