require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    try {
        if(token){
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,decoded)=>{
                if(decoded){
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