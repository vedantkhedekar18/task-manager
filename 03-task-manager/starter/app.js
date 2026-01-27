const express = require('express')
const app = express()
const task = require('./routes/task')

const port = 3000

app.get('/home', (req,res)=>{
    res.send('Task manager app')
})

app.use('/api/v1/task',task)

app.listen(port, console.log(`the server is listening to ${port}...`))
