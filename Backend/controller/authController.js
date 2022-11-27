const User = require("../models/auth")
const jwt = require("jsonwebtoken")
const fs = require("fs")

const privateKey = fs.readFileSync("./Keys/rsa_priv.pem")

exports.register = async (req,res)=>{
    console.log(req.body)
    try{
        const user = await User.register(req.body.email,req.body.password)  // static function calling
        const Token = await jwt.sign({_id : user.id}, privateKey, {algorithm : 'RS256'})// Signing JWT token with payload and RS256 hashing algo.
        res.status(200).json({message : "successfully logged in", user : user.email, token : Token}) 
    }catch(error){
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }

}

/* axios.get('/api/xyz/abcd')
  .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  }); */

exports.login = async (req,res)=>{
    console.log(req.body)
    
    try{
        const user = await User.login(req.body.email,req.body.password)
        const Token = await jwt.sign({_id : user.id}, privateKey, {algorithm : 'RS256'})
        res.status(200).json({message : "successfully logged in", user : user.email, token : Token})
    }catch(error){
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }
}