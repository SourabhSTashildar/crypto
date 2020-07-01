const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const msg = process.argv[2] || uuidv4();

function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
  const publicKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt({
    key: publicKey.toString(),
    padding:crypto.constants.RSA_PKCS1_PADDING,
    passphrase: '',
  }, buffer)
  return encrypted.toString('base64')
}

const enc = encrypt(msg, `public.pem`)
console.log('encrypted message saved to message.txt\n');
fs.writeFileSync('message.txt',enc);