const CustomerController = require("../controller/customer.controller")
const UserAuth = require("./middleware/auth")

module.exports = (qpp) => {
    const customer = new CustomerController();
    app.post("/customer/signup", customer.signUp);
    app.post("/customer/signin", customer.login);
    app.post("/customer/address", customer.address);
    app.post("/customer/profile", customer.profile);
}