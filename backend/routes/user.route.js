const express = require("express");
const register = require("../controllers/userControllers/userRegister.controller.js");
const login = require("../controllers/userControllers/userLogin.controller.js");
const profile = require("../controllers/userControllers/userProfile.controller.js");


const userRouter = express.Router();

userRouter.post("/auth/register",register);
userRouter.post("/auth/login",login);
userRouter.get("/profile",profile);


module.exports = userRouter;