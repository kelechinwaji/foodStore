const ProductRepository = require("../database/repository/product.repository");
const {FormateData} = require("../utils");
const {ApiError} = require("../utils/app.error");

//Business Logic

class ProductService {
    constructor(){
        this.repository = new ProductRepository()
    }

    async CreateProduct(productInputs){
       try {
        const productResult = await this.repository.CreateProduct(productInputs)
        return FormateData(productResult);
       } catch (error) {
        throw new APIError('Data Not found')
       }
    }
}