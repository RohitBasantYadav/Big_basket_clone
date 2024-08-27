const bcrypt = require("bcrypt");
const UserModel = require("../../models/user.model");


const register = async (req, res) => {
    const { name, email, password } = req.body;
    const saltRound = 5;

    try {
        const checkUserPresent = await UserModel.findOne({ email });
        if (checkUserPresent) {
            return res.status(200).json({ msg: `User Already Present Please Login` });
        }
        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (hash) {
                if(name && email){
                const registerUser = new UserModel({ name, email, password: hash })
                await registerUser.save();
                res.status(201).json({ msg: `User Registered Successfully` });
                }else{
                    res.status(400).json({msg:`Please provide all the details for registration`});
                }
            }
            else {
                res.status(500).json({ msg: `Error while hashing password / Password not found: ${err}` });
            }
        })
    } catch (error) {
        res.status(500).json({msg:`Internal server error: ${error}`});
    }
}


module.exports = register;