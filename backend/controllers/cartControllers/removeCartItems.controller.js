const CartModel = require("../../models/cart.model");

const removeCartItems = async(req,res)=>{
    // No need to pass UserId from client side as it will be taken from auth middleware
    const {productId,userId} = req.body;

    try {
        const cartItem = await CartModel.findOne({productId,userId});
        if(!cartItem){
            return res.status(404).json(`Item not found`);
        }
        await CartModel.findByIdAndDelete(cartItem._id);
        res.status(200).json({msg:`Item removed successfully`})
    } catch (error) {
        res.status(500).json({msg:`Internal server error: ${error}`})
    }
}

module.exports = removeCartItems;