const CartModel = require("../../models/cart.model");
const ProductModel = require("../../models/product.model");
const UserModel = require("../../models/user.model");


const addToCart = async (req, res) => {
    // No need to pass UserId from client side as it will be taken from auth middleware
    const { productId, userId } = req.body;

    try {
        // console.log(req.body)
        // Find the product and user
        const product = await ProductModel.findById(productId);
        const user = await UserModel.findOne({ _id: userId });

        if (!product || !user) {
            return res.status(404).json({ message: 'Product or user not found' });
        }

        // Find the cart item if it already exists
        const existingCartItem = await CartModel.findOne({
            productId,
            userId
        });

        if (existingCartItem) {
            // If the product exists in the cart, update the quantity
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            res.status(200).json({ message: 'Product quantity increased by one' });
        } else {
            // If the product doesn't exist in the cart, create a new cart item
            const newCartItem = new CartModel({
                productId,
                userId,
                quantity: 1,
                price: product.price
            });
            await newCartItem.save();
            res.status(200).json({ message: 'Product added to cart successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: `Error adding product to cart: ${error}` });
    }
}

module.exports = addToCart;