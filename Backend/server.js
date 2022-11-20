
const cors = require("cors")
const express = require("express")
require("dotenv").config()
const morgan = require("morgan")
const db = require("./models/db")
const connectToDb = require("./dbconnection/connection.js")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")
const path = require("path")

const diskStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.resolve(__dirname, './uploads'))
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({storage : diskStorage})

console.log(process.env.MONGOCONNECT)


const app = express();
// cross origin resource sharing
app.use(cors({
origin : "*"
}))

// connection to database and listen to requests
connectToDb(process.env.MONGOCONNECT, ()=>{
    app.listen(process.env.PORT, () => {
        console.log("listening to requests on Port "+process.env.PORT)
    })
})


// body-parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
app.use(morgan("dev"))
app.use(upload.single('pics'))



// Routes
app.use(`/api`, require("./routes/cardRouter.js"))
app.use(`/api`, require("./routes/authRouter.js"))