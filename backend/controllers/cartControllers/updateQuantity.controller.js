const CartModel = require("../../models/cart.model");

const updateQuantity = async (req, res) => {
    // No need to pass UserId from client side as it will be taken from auth middleware
    const { productId, userId, inc, dec } = req.body;

    try {
        const cartItem = await CartModel.findOne({ productId, userId });
        if (!cartItem) {
            return res.status(404).json({ msg: `Item not found in cart` });
        }
        if (inc) {
            if (cartItem.quantity <= 6) {
                cartItem.quantity += 1;
                await cartItem.save();
                res.status(200).json({ msg: `Item increased`})
            }
            else {
                res.status(400).json({ msg: `You cannot add more than 6 Items` })
            }
        }
        if (dec) {
            if (cartItem.quantity >= 1) {
                cartItem.quantity -= 1;
                await cartItem.save();
                res.status(200).json({ msg: `Item decreased` })
            } else {
                res.status(400).json({ msg: `You cannot remove more Items` })
            }
        }
    } catch (error) {
        res.status(500).json({ msg: `Internal server error: ${error}` });
    }
}

module.exports = updateQuantity;