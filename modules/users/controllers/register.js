const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwt");
const emailManager = require("../../../managers/email");
// const nodemailer = require("nodemailer");

const register = async (req, res) => {

    const usersModel = mongoose.model("users");
    const {email, password, confirm_password, name, balance} = req.body;

    // validaton...
    if(!name) throw "name must be provided!";
    if(!email) throw "Email must be provided!";
    if(!password) throw "Password must be provided!";
    if(!password.length > 5 ) throw "Password must be at least 5 characters long!";

    if(password !== confirm_password) throw "Password does not match !";

    const getDuplicateEmail = await usersModel.findOne({
        email: email,
    });
    if (getDuplicateEmail) throw "This email already exists";

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await usersModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        balance: balance,

    });
    const accessToken = jwtManager(createdUser);

    await emailManager(
        createdUser.email,
        "Welcome to Expense tracker.", "<h1> Welcome to expense tracker.</h1> <br><br/> We hope you can manage your expenses easily from our platform!",
        "Welcome to Expense tracker"
    );


    res.status(200).json({
        status:"User registered Successfuly",
        accessToken: accessToken,
    });

}

module.exports = register