const mongoose = require("mongoose");

const blacklistingSchema = new mongoose.Schema({
    accessToken:{
        type:String
    },
},{versionKey:false})

const BlacklistingModel = mongoose.model("BlacklistedToken",blacklistingSchema);


module.exports = BlacklistingModel;