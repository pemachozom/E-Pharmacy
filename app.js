const express = require("express")

const app = express()

module.exports = app
const userRouter = require('./routes/userRoutes')

app.use(express.json())

app.use('/api/v1/users',userRouter)
// const port = 4001
// app.listen(port, () => {
//     console.log('App runnig on port ${port} ..')
// })