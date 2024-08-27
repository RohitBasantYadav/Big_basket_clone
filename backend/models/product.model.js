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
    strikedPrice:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discountBadge:{
        type:Number,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        default:2.5,
    },
    quantityInStock:{
        type:Number,
        default:20,
    },
},{versionKey:false})


const ProductModel = mongoose.model("Product",productSchema);

module.exports = ProductModel;