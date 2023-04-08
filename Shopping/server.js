const express = require("express");

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg":"Hello From Shopping"})
});

app.listen(8083, ()=>{
    console.log("Shopping is listening on port 8083");
})