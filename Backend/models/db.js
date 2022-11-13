const mongoose = require("mongoose")

var schema = new mongoose.Schema(
    {
        name : {type:String, required : true},

        place : {type : String, required : true},

        pics : {type: String},

        content : {type : String, required : true},

        email : {type : String, required : true}
    }
);


module.exports =  mongoose.model('mind', schema)