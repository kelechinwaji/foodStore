const ProductController = require("../controller/product.controller");
const UserAuth = require("../controller/middleware/auth")

module.exports = (app) => {
    const product = new ProductController();
   app.post('/Product/create', product.create)
}