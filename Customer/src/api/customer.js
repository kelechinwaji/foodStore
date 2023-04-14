const CustomerController = require("../controller/customer.controller")
const UserAuth = require("./middleware/auth")

module.exports = (qpp) => {
    const customer = new CustomerController();
    app.post("/customer/signup", customer.signUp);
}