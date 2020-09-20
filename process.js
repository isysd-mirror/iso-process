/* global localStorage:false process:true */
'use strict'
// import * as hrtime from '../browser-process-hrtime/index.js'
// import * as nextTick from '../next-tick/index.js'
import global from '../always-global/global.js'

function notImplemented () {
  throw new Error('Not Implemented')
}

export class Process {
  constructor (options) {
    this.options = options || {}
    if (this.options.cwd && typeof (this.options.env.PWD) === 'undefined') this.options.env.PWD = this.options.cwd()
    this.env = this.options.env || {}
    this.platform = this.options.platform || navigator.platform
    this.arch = this.options.arch || navigator.platform
    this.argv = this.options.argv || []
    this.argv0 = this.options.argv0 || []
    this.execArgv = this.options.execArgv || []
    this.execPath = this.options.execPath // could be undefined
    this.exit = this.options.exit || notImplemented
    this.exitCode = this.options.exitCode || 0
    this.channel = this.options.channel // could be undefined
    this.config = this.options.config || {}
    this.connected = this.options.connect || false
    this.cpuUsage = this.options.cpuUsage || notImplemented
    this.debugPort = this.options.debugPort // could be undefined
    this.disconnect = this.options.disconnect || notImplemented
    this.dlopen = this.options.dlopen || notImplemented
    this.getegid = this.options.getegid || notImplemented
    this.geteuid = this.options.geteuid || notImplemented
    this.getgid = this.options.getgid || notImplemented
    this.getgroups = this.options.getgroups || notImplemented
    this.getuid = this.options.getuid || notImplemented
    this.hasUncaughtExceptionCaptureCallback = this.options.hasUncaughtExceptionCaptureCallback || notImplemented
    this.hrtime = this.options.hrtime || notImplemented
    this.initgroups = this.options.initgroups || notImplemented
    this.kill = this.options.kill || notImplemented
    this.memoryUsage = this.options.memoryUsage || notImplemented
    this.nextTick = this.options.nextTick || notImplemented
    this.noDeprecation = this.options.noDeprecation || false
    this.pid = this.options.pid
    this.ppid = this.options.ppid
    this.release = this.options.release || { name: 'guld' }
    this.report = this.options.report || notImplemented
    this.send = this.options.send || notImplemented
    this.setegid = this.options.setegid || notImplemented
    this.seteuid = this.options.seteuid || notImplemented
    this.setgid = this.options.setgid || notImplemented
    this.setgroups = this.options.setgroups || notImplemented
    this.setuid = this.options.setuid || notImplemented
    this.setUncaughtExceptionCaptureCallback = this.options.setUncaughtExceptionCaptureCallback || notImplemented
    this.stderr = this.options.stderr || notImplemented
    this.stdin = this.options.stdin || notImplemented
    this.stdout = this.options.stdout || notImplemented
    this.throwDeprecation = this.options.throwDeprecation || false
    this.title = this.options.title || window.title || 'browser'
    this.traceDeprecation = this.options.traceDeprecation || false
    // this.umask = this.options.umask || notImplemented
    // this.uptime = this.options.uptime || notImplemented
    this.version = this.options.version
    this.versions = this.options.versions || {}
    this.__toString = this.__toString
  }

  static getProcess () {
    // create process from class with seed if available
    if (typeof process === 'object') {
      global.process = process = new Process(process)
    } else if (typeof global.process === 'object') {
      global.process = new Process(global.process)
    } else {
      global.process = new Process({ env: {} })
    }
    return global.process
  }

  toString () {
    if (this.__toString) return this.__toString()
    else return JSON.stringify(this, null, 2)
  }

  get env () {
    if (typeof (this.chenv) === 'undefined') {
      this.env = this.options.env || {}
    }
    return this.chenv
  }

  set env (env) {
    if (typeof env === 'object') {
      this.chenv = env
      this.pwd = this.chenv.PWD
      // this.chenv.HOME = `/@${this.chenv.USER}`
      this.chenv.startTime = this.chenv.startTime || Date.now()
    } else if (typeof localStorage !== 'undefined') {
      env = localStorage.getItem('env')
      if (env) this.env = JSON.parse(env)
    }
  }

  get pwd () {
    return this.cwd()
  }

  set pwd (dir) {
    this.env.OLDPWD = this.env.PWD
    if (this.env.PWD) {

    } else if (dir) this.env.PWD = dir.replace(new RegExp(`^${this.env.HOME}/*`), '/')
    else if (typeof (window) !== 'undefined') this.env.PWD = window.location.pathname.replace(new RegExp('[^/]+\\.[^/]+$'), '')
    else if (this.options.env.PWD) {
      this.pwd = this.options.env.PWD
    } else if (this.release && this.release.name === 'node') {
      this.pwd = this.options.cwd()
    }
  }

  get platform () {
    if (typeof (this.env.PLATFORM) === 'undefined') {
      if (navigator) {
        this.platform = navigator.platform
      }
    }
    return this.env.PLATFORM
  }

  set platform (p) {
    if (p.match(/Linux/i)) this.env.PLATFORM = 'linux'
    else if (p.match(/freebsd/i)) this.env.PLATFORM = 'freebsd'
    else if (p.match(/openbsd/i)) this.env.PLATFORM = 'openbsd'
    else if (p.match(/sunos/i)) this.env.PLATFORM = 'sunos'
    else if (p.match(/aix/i)) this.env.PLATFORM = 'aix'
    else if (p.match(/win32/i)) this.env.PLATFORM = 'win32'
    else if (p.match(/android/i)) this.env.PLATFORM = 'android'
    else if (p.match(/(darwin|mac|ios)/i)) this.env.PLATFORM = 'darwin'
    else if (p.match(/ /)) this.env.PLATFORM = p.split(' ')[0].toLowerCase()
  }

  get arch () {
    if (typeof (this.env.ARCH) === 'undefined') {
      if (navigator) {
        this.arch = navigator.platform
      }
    }
    return this.env.ARCH
  }

  set arch (a) {
    if (a.match(/x[86_]*64/)) this.env.ARCH = 'x64'
    else if (a.match(/x[0-9]*(86|32)/)) this.env.ARCH = 'x32'
    else if (a.match(/arm64/)) this.env.ARCH = 'arm64'
    else if (a.match(/arm/)) this.env.ARCH = 'arm'
    else if (a.match(/ppc64/)) this.env.ARCH = 'ppc64'
    else if (a.match(/ppc/)) this.env.ARCH = 'ppc'
    else if (a.match(/s390x/)) this.env.ARCH = 's390x'
    else if (a.match(/s390/)) this.env.ARCH = 's390'
    else if (a.match(/mipsel/)) this.env.ARCH = 'mipsel'
    else if (a.match(/mips/)) this.env.ARCH = 'mips'
    else if (a.match(/ia32/)) this.env.ARCH = 'ia32'
    else if (a.match(/ /)) this.env.ARCH = a.split(' ')[1]
  }

  chdir (dir) {
    this.env.OLDPWD = this.env.PWD
    this.env.PWD = dir
  }

  cwd () {
    if (typeof (this.env.PWD) !== 'string') this.pwd = undefined
    return this.env.PWD
  }

  uptime () {
    return (Date.now() - this.env.startTime) / 1000
  }
}
