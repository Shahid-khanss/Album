const express = require("express")
const cardController = require("../controller/cardController")

// const multer = require("multer")

// const diskStorage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         cb(null, './uploads/')
//     },
//     filename : (req,file,cb)=>{
//         cb(null, file.originalname)
//     }
// })

// var upload = multer({storage : diskStorage})

const cardRouter = express.Router() // main router



cardRouter.get(`/`, cardController.find)
cardRouter.post(`/`,  cardController.addData)
cardRouter.delete(`/:id`, cardController.deleteData)




module.exports = cardRouter