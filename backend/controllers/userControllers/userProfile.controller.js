const UserModel = require("../../models/user.model")

const profile = async(req,res)=>{
    const {email} = req.user;
    try {
        const user = await UserModel.findOne(email);
        if(user){
            return res.status(200).json({msg:`User Profile: ${user}`});
        }
    } catch (error) {
        res.status(500).json({msg:`Internal server issue ${error}`});
    }
}

module.exports = profile;