const express = require('express')
require('./db/mongoose')
const { request } = require('express')
const userRouter = require('./routers/user')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs')

const app= express()
app.use(cors())

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)


app.listen(port,()=> {
    console.log(port)
})