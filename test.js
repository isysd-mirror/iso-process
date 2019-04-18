'use strict'
import './process.js'
import { finishTest } from '../iso-test/index.js'

async function setup () {
  // set up test environment before loading module
  if (typeof(window) === 'object' && window.localStorage) {
    localStorage.clear()
    var response = await fetch('./.env').catch(e => null)
    if (response && response.ok) {
      var resp = await response.text()
      resp.split('\n').forEach(l => {
        if (l.startsWith('USER=')) process.env.USER = l.slice(5)
        else if (l.startsWith('HOME=')) process.env.HOME = l.slice(5)
        else if (l.startsWith('PWD=')) process.env.PWD = l.slice(4)
      })
    } else {
      throw new Error('Unable to load environment vars. Set in .env for testing.')
    }
    localStorage.setItem('env', JSON.stringify({
      USER: process.env.USER,
      HOME: process.env.HOME
    }))
  } else {
    // write USER, HOME, PWD to .env file for browser to load for testing
    require('fs').writeFileSync('.env', `USER=${process.env.USER}
HOME=${process.env.HOME}
PWD=${process.env.PWD}`)
  }
}

async function run () {
  // refresh environment from localStorage
  // required after setup bootstrap, but not on reload
  process.refreshEnv()
  if (process.env && process.env.USER && process.env.USER !== 'undefined') finishTest('pass process.env.USER')
  else finishTest(`fail process.env.USER: ${process.env.USER}`)

  if (process.env.HOME === `/@${process.env.USER}`) finishTest('pass process.env.HOME')
  else finishTest(`fail process.env.HOME: ${process.env.HOME}`)

  if (typeof(window) === 'object') {
    if (process.title && process.title === 'browser') finishTest('pass title')
    else finishTest(`fail process.title: ${process.title}`)
  } else {
    if (process.title && process.title === 'node') finishTest('pass title')
    else finishTest(`fail process.title: ${process.title}`)
  }

  if (process.env.PWD && process.env.PWD.match(/\/process\/*$/)) finishTest('pass process.env.PWD')
  else finishTest(`fail process.env.PWD: ${process.env.PWD}`)

  if (process.cwd && process.cwd().match(/\/process\/*$/)) finishTest('pass process.cwd')
  else finishTest(`fail process.cwd: ${process.cwd()}`)

  // all passed! send kill to finishtest
  finishTest('kill')
}

setup()
  .catch(e => {
    finishTest(e)
  })
  .then(run)
  .catch(e => {
    finishTest(e)
  })