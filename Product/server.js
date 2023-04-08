const express = require("express");

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg":"Hello From Product"})
});

app.listen(8082, ()=>{
    console.log("Product is listening on port 8082");
})