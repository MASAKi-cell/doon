import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

const input = 'src/styles'

chokidar.watch(`${input}/**/*.tsx`).on('all', (event, file) => {
  if (event !== 'add' && event !== 'unlink') return

  const output = 'src/styles'
  const extSuffix = '.module.scss'

  if (event === 'add') {
  } else if (event === 'unlink') {
  }
})
