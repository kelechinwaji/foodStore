const express = require("express");
const {databaseConnection} = require('./src/Database/index')

const app = express();


app.use(express.json());


const startDb = async()=>{
    await databaseConnection();
}

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg":"Hello From Customer"})
});

app.listen(8081, ()=>{
    console.log("Customer is listening on port 8081");
})

startDb();