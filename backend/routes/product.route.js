const express = require("express");
const addProduct = require("../controllers/productControllers/addProducts.controller");
const getProducts = require("../controllers/productControllers/getProducts.controller");
const getSpecificProduct = require("../controllers/productControllers/getSpecificProduct.controller");

const productRouter = express.Router();

productRouter.post("/addProduct",addProduct);
productRouter.get("/allProducts",getProducts);
productRouter.get("/singleProduct/:id",getSpecificProduct);


module.exports = productRouter;