const ProductService = require("../services/product-service");

ProductService

module.exports = (app) => {
    const service = ProductService();

    app.use('/app-events', async (req, res, next) =>{
        const {payload} = req.body;

        service.SubscribeEvents(payload);

        console.log("========= product Service received event =====");
        return res.json({status: true, data: payload})
    });
}