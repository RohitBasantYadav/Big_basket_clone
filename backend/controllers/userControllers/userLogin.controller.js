require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");

const login = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const checkUserPresent = await UserModel.findOne({email});
        if(!checkUserPresent){
            return res.status(404).json({msg:`User Not found please register before login`})
        }
        bcrypt.compare(password,checkUserPresent.password,(err,result)=>{
            if(result){
                const accessToken = jwt.sign({userId:checkUserPresent._id},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"6h"});
                const refreshToken = jwt.sign({userId:checkUserPresent._id},process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:"1d"});
                res.status(200).json({msg:`Login Successful`,accessToken,refreshToken});
            }
            else{
                res.status(400).json({msg:`Icorrect Password: ${err}`});
            }
        })
        
    } catch (error) {
        res.status(500).json({msg:`Internal server error ${error}`});
    }
}

module.exports = login;