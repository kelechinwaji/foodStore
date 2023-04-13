const CustomerRepository = require("../Database/repository/customer.repository");
const {ApiError, BadRequestError} = require('../utils/app-errors');
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, validatePassword} = require('../utils/index');

// Business Logic
class CustomerService{

    constructor(){
        this.repository = new CustomerRepository;
    }

    async SignIn(userInputs){
        const {email, password} = userInputs;

        try {
            const existingCustomer = await this.repository.FindCustomer({email});

            if(existingCustomer){
                const validatedPassword = await validatePassword(password, existingCustomer.password, existingCustomer.salt);

                if(validatedPassword){
                    const token = await GenerateSignature({email: existingCustomer.email, _id: existingCustomer._id})

                    return FormateData({id: existingCustomer._id, token});
                }
            }
            return FormateData(null);
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }
    }

    async SignUp(userInputs){
        const {email, password, phone} = userInputs;

        try {
            let salt = await GenerateSalt();

            let userPassword = await GeneratePassword(password, salt);

            let existingCustomer = await this.repository.CreateCustomer({email, password: userPassword, phone, salt});

            let token = await GenerateSignature({email: email, id: existingCustomer._id});

            return FormateData({id: existingCustomer._id, token})
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }
    }

    async AddNewAddress(_id, userInputs){
        const {street, postalCode, city, country} = userInputs;

        try {
            const addressResult = await this.repository.CreateAddress({_id, street, postalCode, city, country});

            return FormateData(addressResult);
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }

    }

    async GetProfile(id){
        try {
            const existingCustomer = await this.repository.FindCustomerById(id);

            return FormateData(existingCustomer);
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }
    }

    async GetShopingDetails(id){
        try {
            const existingCustomer = await this.repository.FindCustomerById({id});

            if(existingCustomer){
                return FormateData(existingCustomer);
            }

            return FormateData({msg: 'Error'})
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }
    }

    async GetWishlist(customerId){
        try {
          const wishlistItems = await this.repository.wishlist(customerId);
          return FormateData(wishlistItems)  
        } catch (error) {
            throw new ApiError("Data Not Found", error) 
        }
    }

    async AddToWishlist(customerId, product){
        try {
            const wishlistResult = await this.repository.AddWishlistItems(customerId, product);
            return FormateData(wishlistResult);
        } catch (error) {
            throw new ApiError("Data Not Found", error) 
        }
    }
}