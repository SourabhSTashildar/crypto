const crypto = require('crypto')
const path = require('path')
const fs = require('fs')


function decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
  const privateKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      padding:crypto.constants.RSA_PKCS1_PADDING,
      passphrase: '',
    },
    buffer,
  )
  return decrypted.toString('utf8')
}

const dec = decrypt(fs.readFileSync('message.txt', 'utf8'), `private.pem`)
console.log(dec);