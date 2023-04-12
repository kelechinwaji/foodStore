const CustomerRepository = require("../Database/repository/customer.repository");
const {ApiError, BadRequestError} = require('../utils/app-errors');
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, validatePassword, validatePassword} = require('../utils/index');

// Business Logic
class CustomerService{

    constructor(){
        this.repository = new CustomerRepository;
    }

    async signIn(userInputs){
        const {email, password} = userInputs;

        try {
            const existingCustomer = await this.repository.FindCustomer({email});

            if(existingCustomer){
                const validatePassword = await validatePassword(password, existingCustomer.password, existingCustomer.salt);

                if(validatePassword){
                    const token = await GenerateSignature({email: existingCustomer.email, _id: existingCustomer._id})

                    return FormateData({id: existingCustomer._id, token});
                }
            }
            return FormateData(null);
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }
    }
}