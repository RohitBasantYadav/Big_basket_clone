const CartModel = require("../../models/cart.model")

const getCartItems = async(req,res)=>{
    // No need to pass UserId from client side as it will be taken from auth middleware
    const {userId} = req.body;
    
    // console.log(userId)
    try {
        const cartItems = await CartModel.find({userId});
        if(cartItems){
            res.status(200).json({msg:`All Cart Items`,data:cartItems});
        }else{
            res.status(404).json({msg:`Cart is empty please add items to cart`})
        }
    } catch (error) {
        res.status(500).json({msg:`Internal server error: ${error}`});
    }
}

module.exports = getCartItems;