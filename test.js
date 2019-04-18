'use strict'
import './process.js' //
import { finishTest } from '../iso-test/index.js'

if (typeof(window) === 'object' && window.localStorage) {
  localStorage.clear()
  if (window.sysenv) {
    process.env.USER = window.sysenv.USER
    process.env.HOME = window.sysenv.HOME
    //process.env.PWD = window.sysenv.PWD
  } else {
    throw new Error('Unable to load environment vars.')
  }
  localStorage.setItem('env', JSON.stringify({
    USER: process.env.USER,
    HOME: process.env.HOME
  }))
}

// refresh environment from localStorage
// required after setup bootstrap, but not on reload
process.refreshEnv()
if (process.env && process.env.USER && process.env.USER !== 'undefined') finishTest('pass process.env.USER')
else finishTest(`fail process.env.USER: ${process.env.USER}`)

if (process.env.HOME === `/@${process.env.USER}`) finishTest('pass process.env.HOME')
else finishTest(`fail process.env.HOME: ${process.env.HOME}`)

/*
if (typeof(window) === 'object') {
  if (process.title && process.title === 'browser') finishTest('pass title')
  else finishTest(`fail process.title: ${process.title}`)
} else {
  if (process.title && process.title === 'node') finishTest('pass title')
  else finishTest(`fail process.title: ${process.title}`)
}
*/

if (process.env.PWD && process.env.PWD.match(/\/process\/*$/)) finishTest('pass process.env.PWD')
else finishTest(`fail process.env.PWD: ${process.env.PWD}`)

if (process.cwd && process.cwd().match(/\/process\/*$/)) finishTest('pass process.cwd')
else finishTest(`fail process.cwd: ${process.cwd()}`)

// all passed! send kill to finishtest
finishTest('kill')
