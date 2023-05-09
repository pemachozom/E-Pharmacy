const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

const local_DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD,
)

const DB = process.env.DATABASE_LOCAL
// console.log(process.env.DATABASE_PASSWORD)
mongoose.connect(local_DB).then((con) => {
    console.log(con.connections)
    console.log('DB connection successful')
}).catch(error => console.log(error));

const port = 4001
app.listen(port, () => {
    console.log(`App runnig on port ${port} ..`)
})      
