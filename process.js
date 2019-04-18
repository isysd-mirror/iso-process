'use strict'
import * as hrtime from '../browser-process-hrtime/index.js'
import * as nextTick from '../next-tick/index.js'

function cwd () {
  return this.env.PWD
}

function refreshEnv() {
  if (typeof localStorage !== 'undefined') this.env = Object.assign(this.env, JSON.parse(localStorage.getItem('env'))) || {}
  this.env.HOME = this.env.HOME || `/@${this.env.USER}`
}

if (typeof process !== 'undefined') {
  if (process.env.OLDPWD) process.env.OLDPWD = process.env.OLDPWD.replace(new RegExp(`^${process.env.HOME}/*`), '/')
  process.env.PWD = process.cwd().replace(new RegExp(`^${process.env.HOME}/*`), '/')
  process.env.HOME = `/@${process.env.USER}`
} else {
  const process = {}
  if (typeof(window) !== 'undefined') window.process = process
  if (typeof(global) !== 'undefined') global.process = process
  if (typeof(self) !== 'undefined') self.process = process

  // shim process
  var startTime = new Date();
  process.env = {}
  process.argv = []
  process.config = {}
  process.connected = false
  process.emitWarning = function (warning, options) {
    // TODO handle options
    // TODO emit event
    alert(warning)
  }.bind(process)
  process.execArgv = []
  process.execPath = null
  process.exitCode = 0
  process.release = { name: 'guld' }
  //    stderr
  //    stdin
  //    stdout
  // TODO platform!!
  process.title = 'browser' // TODO replace with specific browser?
  process.uptime = function () {
    var dif = new Date() - startTime
    return dif / 1000
  }.bind(process)

  process.chdir = function (dir) {
    this.env.OLDPWD = this.env.PWD
    this.env.PWD = dir
  }.bind(process)

  process.env.PWD = window.location.pathname.replace(/\/[^\/]+\.[^\/]+$/, '')

  process.umask = function (dir) { return env.umask }.bind(process)
}

process.cwd = cwd.bind(process)
process.refreshEnv = refreshEnv.bind(process)
process.refreshEnv()
export default process
