const crypto = require("crypto")
const fs = require("fs")

const keyPair = crypto.generateKeyPairSync("rsa",{
    modulusLength : 4096,
    publicKeyEncoding : {
        type : "pkcs1",
        format : "pem"
    },
    privateKeyEncoding : {
        type : "pkcs1",
        format : "pem"
    }
    
})

fs.writeFileSync("./Keys/rsa_pub.pem", keyPair.publicKey.toString())
fs.writeFileSync("./Keys/rsa_priv.pem", keyPair.privateKey.toString())

