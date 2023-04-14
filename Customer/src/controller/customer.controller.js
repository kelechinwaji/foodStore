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
}