require('dotenv').config()
import express from 'express'
import initWebRoutes from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import mysql from 'mysql2';

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app)

initWebRoutes(app)


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

connection.execute('select * from users', (error, result) => {
    console.log(result);
    
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})