require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const notfoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products">Product route </a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notfoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server is listening to port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()