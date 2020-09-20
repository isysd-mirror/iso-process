'use strict'
import global from '../always-global/global.js'
import { Process } from './process.js'
import { finishTest } from '../iso-test/index.js'
global.process = Process.getProcess()

if (global && global.global) finishTest('pass global defined')

if (process instanceof Process) finishTest('pass instanceof Process')
else finishTest('fail process not instanceof Process')

//if (process.env && process.env.USER && process.env.USER !== 'undefined') finishTest('pass process.env.USER')
//else finishTest(`fail process.env.USER: ${process.env.USER}`)

//if (process.env.HOME === `/@${process.env.USER}`) finishTest('pass process.env.HOME')
//else finishTest(`fail process.env.HOME: ${process.env.HOME}`)

/*
if (typeof(window) === 'object') {
  if (process.title && process.title === 'browser') finishTest('pass title')
  else finishTest(`fail process.title: ${process.title}`)
} else {
  if (process.title && process.title === 'node') finishTest('pass title')
  else finishTest(`fail process.title: ${process.title}`)
}
*/

if (process.env.PWD && process.env.PWD.indexOf('/iso-process') >= 0) finishTest('pass process.env.PWD')
else finishTest(`fail process.env.PWD: ${process.env.PWD}`)

if (process.cwd && process.cwd().indexOf('/iso-process') >= 0) finishTest('pass process.cwd')
else finishTest(`fail process.cwd: ${process.cwd()}`)

// all passed! send kill to finishtest
finishTest('kill')
