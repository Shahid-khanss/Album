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
        const user = await User.findOne({_id})
        req.user_id = user.id // mongooe make id as _id : ObjectId('asdfasdf'), so we use .id instead of _id to grab id
        console.log(req.user_id)
        next()
        }catch(error){
            res.status(401).json({error : "Not Authorized"})
        }
    }
}