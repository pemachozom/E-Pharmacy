const express = require("express") //import express
const path = require("path")
const userRouter = require('./routes/userRoutes')
const app = express() //express dependency found in app
// const userRouter =require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const newsRouter = require('./routes/newsRoutes')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json()) //app.-variable, 
app.use('/api/v1/users', userRouter) //show route
app.use('/api/v1/news',newsRouter)
// Starting the server in port 4001.
app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
module.exports = app

// const port = 4001
// app.listen(port, () => {
//     console.log('App runnig on port ${port} ..')
// })

