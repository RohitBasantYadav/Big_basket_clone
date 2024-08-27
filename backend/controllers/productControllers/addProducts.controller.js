const ProductModel = require("../../models/product.model");

const addProduct = async (req, res) => {
    const { productName, brandName, category, description, imageUrl, strikedPrice, price, discountBadge, size, rating, quantityInStock } = req.body;
    try {
        if (productName && brandName && category && imageUrl && price && strikedPrice && discountBadge && size) {
            const addProduct = new ProductModel({ productName, brandName, category, description, imageUrl, strikedPrice, price, discountBadge, size, rating, quantityInStock });
            await addProduct.save();
            res.status(201).json({ msg: `Product added successfully` })
        }
        else {
            res.status(400).json({ msg: `Please fill all the details of the product before submitting` })
        }
    } catch (error) {
        res.status(500).json({ msg: `Internal server issue: ${error}` });
    }
}

module.exports = addProduct;