require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db_config/db.js");
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/product.route.js");
const cartRouter = require("./routes/cart.route.js");
const authentication = require("./middlewares/authentication.middleware.js");
const limiter = require("./middlewares/ratelimiter.middleware.js");

const PORT = process.env.PORT || 4040;

const app = express();

// All middlewares
app.use(cors());
app.use(express.json());
// app.use(limiter)
app.use("/user",userRouter);
app.use("/products",productRouter);
app.use("/cart",authentication,cartRouter);


//Health check route
app.get("/", (_, res) => {
    res.send("Server is running fine");
})


app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running on ${PORT} and connected to db`)
    } catch (error) {
        console.log(`Error while connecting to server or db ${error}`)
    }

})