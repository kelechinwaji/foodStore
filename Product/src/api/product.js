const ProductController = require("../controller/product.controller");
const UserAuth = require("../controller/middleware/auth")

module.exports = (app) => {
    const product = new ProductController();
   app.post('/Product/create', product.create)
   app.get('/category/:type', product.category)
   app.get('/:id', product.fetchDesc)
   app.post('/ids', product.selectProduct)
}