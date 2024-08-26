const express = require("express");
const addToCart = require("../controllers/cartControllers/addToCart.controller");
const getCartItems = require("../controllers/cartControllers/getCartItems.controller");
const removeCartItems = require("../controllers/cartControllers/removeCartItems.controller");
const updateQuantity = require("../controllers/cartControllers/updateQuantity.controller");

const cartRouter = express.Router();

cartRouter.post("/addToCart",addToCart);
cartRouter.get("/cartItems",getCartItems);
cartRouter.patch("/updateCart",updateQuantity);
cartRouter.delete("/remove",removeCartItems);


module.exports = cartRouter;