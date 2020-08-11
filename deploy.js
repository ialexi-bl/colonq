#!/usr/bin/env node
const FtpDeploy = require('ftp-deploy')
const argsParser = require('args')
const { resolve } = require('path')
const readline = require('readline-sync')
const { exec } = require('child_process')

argsParser
  .option('user', 'FTP user name', process.env.FTP_USERNAME)
  .option('host', 'FTP host', process.env.FTP_HOST)
  .option('port', 'FTP port', 22)
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

  console.log('Building...')
  exec('npm run build', (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Uploading...')
    const ftpDeploy = new FtpDeploy()
    ftpDeploy
      .deploy({
        password,
        user: args.user,
        host: args.host,
        port: args.port,
        localRoot: resolve(__dirname, 'build'),
        remoteRoot: args.remoteRoot,
        include: ['*'],
        deleteRemove: true,
      })
      .then(() => {
        console.log(`Done in ${(Date.now() - time) / 1000}s`)
      })
      .catch(console.error)
  })
}
