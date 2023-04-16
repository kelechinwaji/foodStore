const express = require('express');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const dotEnv = require('dotenv');

dotEnv.config()

const PORT = process.env.PORT;

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();