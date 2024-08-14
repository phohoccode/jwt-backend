require('dotenv').config()
import express from 'express'
import initWebRoutes from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connection from './config/connectDB'

const app = express()
const PORT = process.env.PORT || 8080

// config view engine
configViewEngine(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// test connect db
// connection()

initWebRoutes(app)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})