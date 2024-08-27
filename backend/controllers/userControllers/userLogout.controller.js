const BlacklistingModel = require("../../models/blacklistToken.model");

const logout = async(req,res)=>{
    const accessToken = req?.headers?.authorization?.split(" ")[1];

    try {
        if(accessToken){
            const blacklistedToken = await BlacklistingModel.findOne({accessToken});
            if (blacklistedToken) {
                return res.status(200).json({ msg: "Logout Successfull" })
            } 
            else {
                const blacklistToken = new BlacklistingModel({ accessToken })
                await blacklistToken.save();
                return res.json({ msg: "Logout Successfull" });
            }
        }else{
            res.status(404).json({msg:`Token not found`});
        }
    } catch (error) {
        res.status(500).json({msg:`Internal server issue: ${error}`});
    }
}

module.exports = logout;