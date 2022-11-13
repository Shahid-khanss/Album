
const db = require("../models/db")
const mongoose = require("mongoose")


exports.find = ((req,res)=>{
    if(req.query.id){
        db.findById(req.query.id)
        .then(data=>res.send(data)).catch(err=>console.log(err))
    }
    
    db.find()
    .then(data=> res.status(200).send(data))
    .catch(err=>console.log(err))
})

exports.addData = (req,res)=>{
 
 console.log(req.file)
    const newData = new db(
        {
            name : req.body.name,
            place : req.body.place,
            pics : req.file.filename,
            content : req.body.content,
            email : req.body.email
   
        }
    ) 
    newData.save()
    .then(data=>res.status(200).json(data)).catch(err=>console.log(err))
}

exports.deleteData = (req,res)=>{
    db.findByIdAndDelete(req.params.id)
    .then(data=>res.send(data)).catch(err=>console.log(err))
}