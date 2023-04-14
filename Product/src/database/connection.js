const mongoose = require('mongoose');
// const { DB_URL } = require('../config/index');
const dotEnv = require('dotenv');

dotEnv.config()
const DB_URL = process.env.MONGODB_URI;


module.exports = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
           // useUnifieldTopology: true,
          //  useCreateIndex: true
        });
        console.log("Db Connected Successfully");
    } catch (error) {
        console.log('Error ======');
        console.log(error);
        process.exit(1);
    }
}