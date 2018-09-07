/* eslint-disable no-console */

module.exports = (on) => {
  on('before:test:run', (test) => {
    console.log('before:test:run:', test.title)
    throw new Error('Error thrown synchronously from "before:test:run". Should be ignored.')
  })

  on('command:enqueued', (command) => {
    console.log('command:enqueued:', command.name, command.args.join(', '))
  })

  on('command:start', (command) => {
    console.log('command:start:', command.name, command.args.join(', '))
  })

  // only do this once or it's a lot of logging
  let retryCalled = false
  on('command:retry', (retry) => {
    if (retryCalled) return
    retryCalled = true
    console.log('command:retry:', retry.name, retry.error.message)
  })

  on('command:end', (command) => {
    console.log('command:end:', command.name, command.args.join(', '))
  })

  on('after:test:run', (test) => {
    console.log('after:test:run:', test.title)
    return Promise.reject(new Error('Error thrown in promise from "test:after:run". Should be ignored.'))
  })
}