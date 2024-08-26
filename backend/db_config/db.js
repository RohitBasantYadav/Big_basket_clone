require("dotenv").config();
const mongoose = require("mongoose");


const uri_string = process.env.MONGODB_URI;

const connection = mongoose.connect(uri_string);

module.exports = connection;