const express = require("express");
const register = require("../controllers/userControllers/userRegister.controller.js");
const login = require("../controllers/userControllers/userLogin.controller.js");
const profile = require("../controllers/userControllers/userProfile.controller.js");
const generateAccessToken = require("../controllers/userControllers/userRefreshToken.controller.js");
const logout = require("../controllers/userControllers/userLogout.controller.js");
const authentication = require("../middlewares/authentication.middleware.js");


const userRouter = express.Router();

userRouter.post("/auth/register",register);
userRouter.post("/auth/login",login);
userRouter.post("/auth/logout",logout)
userRouter.get("/profile",authentication,profile);
userRouter.get("/auth/getAccessToken",generateAccessToken);

module.exports = userRouter;