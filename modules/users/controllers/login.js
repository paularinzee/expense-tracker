const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const auth = require("../../../middleware/auth");
const jwtManager = require("../../../managers/jwt");
const login = async (req, res) => {

    const usersModel = mongoose.model("users");
    const {email, password} = req.body;

    // validaton...
    
    if(!email) throw "Email must be provided!";
    if(!password) throw "Password must be provided!";
    // if(!password.lengh > 5 ) throw "Password must be at least 5!";

    // if(password !== confirm_password) throw "Password does not match !";

    const getUser = await usersModel.findOne({
        email: email,
    });
    if (!getUser) throw "This email does not exists";

    const checkpassword = await bcrypt.compare(password,getUser.password);

    if (!checkpassword) throw "Password do not match";

    // auth with jwt

    const accessToken = jwtManager(getUser);

    
    res.status(200).json({
        status:"success",
        message:"User logged Successfuly",
        accessToken: accessToken,
    });

}

module.exports = login