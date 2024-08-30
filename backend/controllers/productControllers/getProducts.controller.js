const ProductModel = require("../../models/product.model");

const getProducts = async (req, res) => {
    const { category, brandName, sort, order, page, limit, q } = req.query;

    const filter = {};
    const sortBy = {};

    // Filtering funcionality
    if (q) {
        filter.$or = [
            filter.productName = { $regex: q, $option: "i" },
            filter.category = { $regex: q, $option: "i" },
            filter.description = { $regex: q, $option: "i" },
            filter.brandName = { $regex: q, $option: "i" }
        ]
    }

    if (category) {
        filter.category = category;
    }
    if (brandName) {
        filter.brandName = brandName;
    }

    // Sorting funcionality
    if (sort && order) {
        sortBy[sort] = order === "desc" ? -1 : 1;
    }

    try {
        const product = await ProductModel.find(filter).sort(sortBy);
        if (product) {
            res.status(200).json({ msg: `Products:`, totalProduct: product.length, data: product });
        } else {
            res.status(404).json({ msg: `Product not found` });
        }
    } catch (error) {
        res.status(500).json({ msg: `Internal server issue: ${error}` });
    }
};


module.exports = getProducts;