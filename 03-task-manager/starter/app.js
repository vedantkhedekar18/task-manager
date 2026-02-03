const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound  = require('./middleware/not_found')
const errorhandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(express.static('./public') )
app.use('/api/v1/tasks',tasks)

app.use(errorhandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 3000 

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`the server is listening to ${port}...`))
    }
    catch(err){
        console.log(err)
    }
}

start()


