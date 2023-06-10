const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        fname:String,
        lname:String,
    },
    type:{type:String,enum:['customer','admin'],default:"customer"},
    phone:String,
    email:String,
    password:String,
    address:{
        city:String,
        street:String,
        zipcode:String
    }

},{timestamps:true})

module.exports = mongoose.model('user',userSchema);