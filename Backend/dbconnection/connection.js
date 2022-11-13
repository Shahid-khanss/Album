

const mongoose = require("mongoose")



function connectToDb(url,cb){

    mongoose.connect(url)
    .then(() => {
        console.log(`connected to database`)
       cb();
    }).catch(err => {
        console.log(err)
    })
}

module.exports = connectToDb