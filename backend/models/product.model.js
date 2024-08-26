const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:2.5,
        required:true
    },
    quantityInStock:{
        type:Number,
        default:10,
    },
})


const ProductModel = mongoose.model("Product",productSchema);

module.exports = ProductModel;