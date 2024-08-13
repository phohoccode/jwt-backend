import mysql from 'mysql2'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});

const getHomePage = (req, res) => {
    res.render('home.ejs')
}

const getUserPage = (req, res) => {
    res.render('user.ejs')
}

const handleCreateNewUser = (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body
    connection.query('insert into users (email, username, password) values (?,?,?)', [email, username, password], (error, result) => {
        console.log('Insert user successfull!')
    })
}

module.exports = {
    getHomePage, getUserPage, handleCreateNewUser
}