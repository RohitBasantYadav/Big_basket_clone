const UserModel = require("../../models/user.model")

const profile = async(req,res)=>{
    const {userId} = req.body;
    try {
        const user = await UserModel.findOne({_id:userId});
        if(user){
            return res.status(200).json({msg:`User Profile:`,name:user.name,email:user.email,_id:user._id});
        }
    } catch (error) {
        res.status(500).json({msg:`Internal server issue ${error}`});
    }
}

module.exports = profile;