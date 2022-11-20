const User = require("../models/auth")


exports.register = async (req,res)=>{
    console.log(req.body)
    try{
        const user = await User.register(req.body.email,req.body.password)
        res.status(200).send(user)
    }catch(error){
        res.status(400).send(error.message)
    }

}


exports.login = async (req,res)=>{
    console.log(req.body)
    try{
        const user = await User.login(req.body.email,req.body.password)
        res.status(200).json({message : "successfully logged in"})
    }catch(error){
        res.status(400).send(error.message)
    }
}