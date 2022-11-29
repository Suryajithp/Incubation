const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeUrls = require('./routes/admin')
const userUrls = require('./routes/user')
const cors = require('cors')

dotenv.config()


app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next()
})

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("database connected"))

app.use('/admin', routeUrls)
app.use('/', userUrls)
app.listen(4000,()=> console.log("server is up and running"))

