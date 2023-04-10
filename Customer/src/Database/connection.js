const mongoose = require('mongoose');
const {DB_URL} = require('../config/index')

module.exports = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifieldTopology: true,
            useCreateIndex: true
        });
        console.log("Db Connected Successfully");
    } catch (error) {
        console.log('Error ======');
        console.log(error);
        process.exit(1);
    }
}