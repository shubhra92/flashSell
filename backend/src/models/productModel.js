const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    quantity:Number,
    rating:{
        rate:String,
        count:Number
    }
},{timestamps:true})

module.exports = mongoose.model('product',productSchema);