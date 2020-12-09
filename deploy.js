#!/usr/bin/env node
const FtpDeploy = require('ftp-deploy')
const argsParser = require('args')
const { resolve } = require('path')
const readline = require('readline-sync')
const { exec } = require('child_process')

argsParser
  .option('user', 'FTP user name', process.env.FTP_USERNAME)
  .option('host', 'FTP host', process.env.FTP_HOST)
  .option('port', 'FTP port', 21)
  .option('deploy-only', 'True to build react project before deploying', false)
  .option('remoteRoot', 'Deployment directory', process.env.FTP_REMOTE_ROOT)
const args = argsParser.parse(process.argv)

if (!args.user) {
  console.error('FTP User not provided')
} else if (!args.host) {
  console.error('FTP host not provided')
} else if (!args.port) {
  console.error('FTP port not provided')
} else if (!args.remoteRoot) {
  console.error('FTP remote root not provided')
} else {
  deploy()
}

const time = Date.now()
function deploy() {
  const password = readline.question(
    `Enter password for ${args.user}@${args.host}: `,
    {
      hideEchoBack: true,
      mask: '',
    },
  )

  if (args.deployOnly) proceed()
  else {
    console.log('Building...')
    exec('npm run build', (err) => {
      if (err) return console.error(err)
      proceed()
    })
  }

  function proceed(err) {
    if (err) {
      console.error(err)
      return
    }

    console.log('Uploading...')
    const ftpDeploy = new FtpDeploy()
    ftpDeploy.on('uploading', console.log)
    ftpDeploy.on('log', console.log)
    ftpDeploy.on('upload-error', console.error)

    ftpDeploy
      .deploy({
        password,
        user: args.user,
        host: args.host,
        port: args.port,
        deleteRemote: true,
        localRoot: resolve(__dirname, 'build'),
        remoteRoot: args.remoteRoot,
        include: ['*'],
        deleteRemove: true,
      })
      .then(() => {
        console.log(`Done in ${(Date.now() - time) / 1000}s`)
      })
      .catch(console.error)
  }
}
