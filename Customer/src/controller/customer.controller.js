const CustomerService = require("../service/customer.service");

const service = new CustomerService();

class CustomerController {

    async signUp (req,res){
        try {
            const {email, password, phone} = req.body;
            const {result} = await service.SignUp({email, password, phone});
            return res.json({status: true, data: result })
        } catch (error) {
            return res.json({status: false, data: error })
        }
    }

    async login (req, res){
        try {
            const {email, password} = req.body;

            const {result} = await service.SignIn({email, password});
            return res.json({status: true, data: result })
        } catch (error) {
            return res.json({status: false, data: error })
        }
    }

    async address (req, res){
        try {
           const {_id} = req.user;
           const { street, postalCode, city, country } = req.body;
           const {result} = await service.AddNewAddress(_id, {street, postalCode, city, country});
           return res.json({status: true, data: result })
        } catch (error) {
            return res.json({status: false, data: error })
        }
    }
}