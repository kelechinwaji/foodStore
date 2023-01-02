import express, { request, response } from 'express'

const app = express()
const PORT = 8080;
app.use(express.json())


app.get('/', (request, response)=>{
    response.status(200).send('Welcome to Retailloop')
 })

 app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})

export default app;