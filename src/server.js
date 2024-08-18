require('dotenv').config()
import express from 'express'
import initWebRoutes from './routes/web'
import initApiRoutes from './routes/api'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import configCors from './config/cors'

const app = express()
const PORT = process.env.PORT || 8080

// fix cors policy
configCors(app)

// config view engine
configViewEngine(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// test connect db
// connection()

initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})