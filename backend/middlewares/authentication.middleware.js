require("dotenv").config();
const jwt = require("jsonwebtoken");
const BlacklistingModel = require("../models/blacklistToken.model");

const authentication = async(req,res,next)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if(token){
            const blacklistedToken = await BlacklistingModel.findOne({accessToken:token});
            if(blacklistedToken){
                return res.status(401).json({msg:`Token exprired please Login again`})
            }
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,decoded)=>{
                if(decoded){
                    // console.log(decoded);
                    req.body.userId = decoded.userId;
                    next();
                }else{
                    res.status(401).json({msg:`Invalid Token: ${err}`});
                }
            }); 
        }else{
            res.status(404).json({msg:`Token not found`})
        }
    } catch (error) {
        res.status(500).json({msg:`Internal server error: ${error}`});
    }
}


module.exports = authentication;