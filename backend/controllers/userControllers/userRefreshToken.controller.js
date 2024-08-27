require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAccessToken = async(req,res)=>{
    const refreshToken = req?.headers?.authorization?.split(" ")[1];
    try {
        if(refreshToken){
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY,(err,decoded)=>{
                if(decoded){
                    const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"6h"});
                    res.status(200).json({msg:`Access Token generated successfully`,accessToken})
                }else{
                    res.status(401).json({msg:`Invalid Token: ${err}`});
                }
            }); 
        }else{
            res.status(404).json({msg:`Token not found`})
        }
    } catch (error) {
        
    }
}

module.exports = generateAccessToken;