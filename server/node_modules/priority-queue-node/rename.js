/* istanbul ignore file */
'use strict'

const writeFileSync = require('fs').writeFileSync
const pkg = require('./package.json')

function rename(name) {
  pkg.name = name
  writeFileSync(process.cwd() + '/package.json', JSON.stringify(pkg, null, 2))
}

rename(process.argv[2])
