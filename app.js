const express = require("express") //import express
const path = require("path")
const userRouter = require('./routes/userRoutes')
const app = express() //express dependency found in app
// const userRouter =require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')

// const cookieParser = require('cookie-parser')
// app.use(cookieParser())

app.use(express.json()) //app.-variable, 
app.use('/api/v1/users', userRouter) //show route
// Starting the server in port 4001.
app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
module.exports = app
