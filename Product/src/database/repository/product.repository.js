const {ProductModel} = require("../models/product")
const {ApiError, BadRequestError} = require("../../utils/app.error")

//Database Operations
class ProductRepository {
    async CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      }) {
        try {
          const product = new ProductModel({
            name,
            desc,
            type,
            unit,
            price,
            available,
            suplier,
            banner,
          });
    
          const productResult = await product.save();
          return productResult;
        } catch (err) {
          throw new ApiError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Create Product"
          );
        }
      }

      async Products(){
        try {
          return await ProductModel.find();
        } catch (error) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Get Products"
          );
        }
      }

      async FindById(){
        try {
          return await ProductModel.FindById(id);
        } catch (error) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Product"
          );
        }
      }

      async FindByCategory(category){
        try {
          const products = await ProductModel.find({type: category});
          return products;
        } catch (error) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Category"
          );
        }
      }
}