const express = require('express');
const mongoose = require('mongoose');
const route = require('./Route/route')
const cors = require('cors');


const app = express()
app.use(cors())

//connent mongoDB
const url = "mongodb+srv://dummy:BvRg1J4kGWqcwmZn@cluster0.pz2jflb.mongodb.net/flash_saleDB"
mongoose.connect(url).then(()=>console.log('mongodb connected')).catch((err)=>console.log({mongoError:err.message}))

app.use(express.json())

app.use(route)



const port = 3004
app.listen(port,()=>console.log('server running on port '+port));