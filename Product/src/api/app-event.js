

module.exports = (app) => {
  
    app.use('/app-events', async (req, res, next) =>{
        const {payload} = req.body;

        console.log("========= product Service received event =====");
        return res.json({status: true, data: payload})
    });
}