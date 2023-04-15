const ProductRepository = require("../database/repository/product.repository");
const {FormateData} = require("../utils");
const {ApiError} = require("../utils/app.error");

//Business Logic

class ProductService {
    constructor(){
        this.repository = new ProductRepository()
    }
}