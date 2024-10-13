const jsonwebtoken = require("jsonwebtoken");


const auth = (req, res, next) =>{

    // console.log(req.headers);

    // const accessToken = req.headers.authorization;
    // console.log(accessToken);
    try{

        const accessToken = req.headers.authorization.replace("Bearer ","");
        const jwt_paylaod = jsonwebtoken.verify(
            accessToken,
            process.env.JWT_SALT
            );
            req.user = jwt_paylaod;
    } catch (e){
        res.status(401).json({
            status:"failed",
            message: "Unauthorized!",
        });
        return;
    }
    next();
};


module.exports = auth;