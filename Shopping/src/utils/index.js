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