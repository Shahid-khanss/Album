const jwt = require('jsonwebtoken')
const fs = require('fs')
const User = require('../models/auth')
const path = require('path')
exports.userAuth = async (req,res,next)=>{
    const publicKey = fs.readFileSync(path.resolve(__dirname, "..", "Keys", "rsa_pub.pem"))
    const {authorization} = req.headers
    
    if(!authorization){
        res.status(401).json({error : "Not Authorized"})
    }
    
    if(authorization){
        const token = authorization.split(' ')[1]
        try{
        const {_id} = jwt.verify(token,publicKey, {algorithms : ['RS256']}) // will return payload of token, from which we destructure _id
        const user = User.findOne({_id}).select('_id')
        req.user = user // make req.user object
        next()
        }catch(error){
            res.status(401).json({error : "Not Authorized"})
        }
    }
}