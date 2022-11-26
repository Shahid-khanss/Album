const User = require("../models/auth")
const jwt = require("jsonwebtoken")
const fs = require("fs")

const privateKey = fs.readFileSync("./Keys/rsa_priv.pem")

exports.register = async (req,res)=>{
    console.log(req.body)
    try{
        const user = await User.register(req.body.email,req.body.password)
        const Token = await jwt.sign(user.id, privateKey)
        res.status(200).json({user : user.email, token : Token})
    }catch(error){
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }

}


exports.login = async (req,res)=>{
    console.log(req.body)
    try{
        const user = await User.login(req.body.email,req.body.password)
        const Token = await jwt.sign(user.id, privateKey)
        res.status(200).json({message : "successfully logged in", user : user.email, token : Token})
    }catch(error){
        res.status(400).send(error.message)
    }
}