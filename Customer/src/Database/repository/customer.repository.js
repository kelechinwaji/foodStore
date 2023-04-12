const {CustomerModel, AddressModel} = require("../models/");
const {ApiError, BadRequestError, STATUS_CODES} = require("../../utils/app-errors")


//Dealing with data base operations
class CustomerRepository {
    async CreateCustomer({email, password, phone, salt}){
        try {
            const customer = new CustomerModel({
                email,
                password,
                salt,
                phone,
                address: [],
            });
            const customerResult = await customer.save();
            return customerResult
        } catch (error) {
           throw new ApiError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Create Customer"
           );
        }
    }
}