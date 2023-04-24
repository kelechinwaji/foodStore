const ShopingService = require("../services/shopping-service");

module.exports = (app) => {
    const service = new ShopingService();

    app.use('/app-events', async (req, res, next) =>{
        const {payload} = req.body;

        service.SubscribeEvents(payload);

        console.log("========= shopping Service received event =====");
        return res.json({status: true, data: payload})
    });
}