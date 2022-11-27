const express = require("express")
const cardController = require("../controller/cardController")
const {userAuth} = require("../middlewares/userAuth")

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


cardRouter.use('/cards',userAuth)
cardRouter.get(`/cards`, cardController.find)
cardRouter.post(`/cards`,  cardController.addData)
cardRouter.delete(`/cards/:id`, cardController.deleteData)




module.exports = cardRouter