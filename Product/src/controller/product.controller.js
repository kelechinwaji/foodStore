const ProductService = require("../service/product.service");
const UserAuth = require("../controller/middleware/auth");

const service = new ProductService();

class ProductController {
   async create(req, res){
    try {
        const {name, desc, type, unit, price, available, suplier, banner} = req.body
        const result = await service.CreateProduct({name, desc, type, unit, price, available, suplier, banner});
        return res.json({status: true, data: result})
    } catch (error) {
        return res.json({status: true, data: error})
    }
   } 

   async category(req, res){
    const type = req.params.type;
    try {
        const result = await service.GetProductByCategory(type);
        return res.json({status: true, data: result})
    } catch (error) {
        return res.json({status: true, data: error})
    }
   }
}