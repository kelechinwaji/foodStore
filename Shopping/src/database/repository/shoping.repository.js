const orderModels = require("../models/order.models");
const { v4: uuidv4 } = require('uuid');
const {ApiError, BadRequestError} = require("../../utils/app.error")

// Database operations

class ShoppingRepository {
    // payment
    async Orders(customerId){
        try{
            const orders = await OrderModel.find({customerId }).populate('items.product');        
            return orders;
        }catch(err){
            throw ApiError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Orders')
        }
    }
}