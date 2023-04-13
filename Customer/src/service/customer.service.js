const CustomerRepository = require("../Database/repository/customer.repository");
const {ApiError, BadRequestError} = require('../utils/app-errors');
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, validatePassword} = require('../utils/index');

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

    async signUp(userInputs){
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
}