
const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : false
    },
    ToDoList : {
        type : Array,
        required : false
    },
    password : {
        type : String,
        required : false
    }
})


const User = mongoose.model("Users",userScheme);


module.exports = User;