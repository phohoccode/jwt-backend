require('dotenv').config()
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import configCors from './config/cors'
import initWebRoutes from './routes/web'
import initApiRoutes from './routes/api'
import configViewEngine from './config/viewEngine'

const app = express()
const PORT = process.env.PORT || 8080

// fix cors policy
configCors(app)

// config view engine
configViewEngine(app)

// config body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config cookie parser
app.use(cookieParser())

initWebRoutes(app)
initApiRoutes(app)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})