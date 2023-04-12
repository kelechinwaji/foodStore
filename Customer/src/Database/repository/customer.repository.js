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

    async CreateAddress({_id, street, postalCode, city, country}){
        try {
            const profile = await CustomerModel.findById(_id);

            if (profile){
                const newAddress = new AddressModel({
                    street,
                    postalCode,
                    city,
                    country,
                });

                await newAddress.save();
            }
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Error on Create Address"
               );
        }
    }

    async FindCustomer({email}){
        try {
            const existingCustomer = await CustomerModel.findOne({ email: email});
            return existingCustomer;
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Find Address"
               );
        }
    }

    async FindCustomerById({id}){
        try {
            const existingCustomer = await CustomerModel.findById(id)
              .populate("address")
              .populate("wishlist")
              .populate("orders")
              .populate("cart.product");
            return existingCustomer;
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Find Customer"
               );
        }
    }

    async wishlist(customerId){
        try {
            const profile = await CustomerModel.findById(customerId).populate("wishlist");

            return profile.wishlist;
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Get wishlist"
               );
        }
    }
}

