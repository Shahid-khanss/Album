const express = require("express")
const controller = require("../controller/controller")
const router = express.Router()
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


router.get(`/api`, controller.find)

router.post(`/api`,  controller.addData)

router.delete(`/api/:id`, controller.deleteData)

module.exports =  router;