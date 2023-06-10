const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user_Id:String,
    product_Id:String,
    quantity:Number,
    totalPrice:Number,
    address:{
        address:String,
        city:String,
        street:String,
        zipcode:String
    }
},{timestamps:true})


module.exports= mongoose.model('order',orderSchema);