const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const msg = process.argv[2] || `hey there, what's going on?`;

function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
  const publicKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

const enc = encrypt(msg, `public.pem`)
console.log('encrypted message saved to message.txt\n');
fs.writeFileSync('message.txt',enc);