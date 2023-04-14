const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {APP_SECRET} = require("../config/index");

//utility functions
module.exports.GenerateSalt = async () =>{
    return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) =>{
    return await bcrypt.hash(password, salt);
};

module.exports.validatePassword = async (
    enteredPassword,
    savePassword,
    salt
)=>{
    return (await this.GeneratePassword(enteredPassword, salt)) === savePassword
};

module.exports.GenerateSignature = async (payload) =>{
    try {
        return await jwt.sign(payload, APP_SECRET, {expiresIn: "10d"});
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.ValidateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        console.log(signature);
        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};