const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true,
    }
})

userSchema.statics.register = async function (email, password){
    if(!email || !password){
        throw Error("Fields Cannot be empty")
    }

    if(!validator.isEmail(email)){
        throw Error ("Email not Valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error ("Password is not strong enough")
    }

    const exist = await this.findOne({email})
    if(exist){
        throw Error("User already Exists")
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({email,password : hash})
    return user

}

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("Fields Cannot be empty")
    }

   const  user = await this.findOne({email})
    
    if(!user){
        throw Error("User does not exist")
    }

    const exist = await bcrypt.compare(password,user.password)
    if(exist){
        return user
    }
    else
    throw Error("Incorrect Password")
}



module.exports = mongoose.model("User", userSchema)

