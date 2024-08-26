const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
        min:1,
        max:6
    },
    price:{
        type:Number,
        required:true
    }
})

const CartModel = mongoose.model("CartItem",cartSchema);

module.exports = CartModel;