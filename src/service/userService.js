import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise'
import bluebird from 'bluebird';
import db from '../models'

const salt = bcrypt.genSaltSync(10);

// hàm này dùng để mã hoá password
const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const createNewUser = async (username, email, password) => {
    const hashPass = hashPassword(password)

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    try {
        // await connection.execute(`
        //     INSERT INTO user (username, email, password)
        //     values (?,?,?)
        // `, [username, email, hashPass])
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.log(error)
    }
}

const getUserList = async () => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'username', 'email'],
        include: {
            model: db.Group,
            attributes: ['id', 'name', 'description']
        },
        raw: true,
        nest: true
    })

    let roles = await db.Role.findAll({
        attributes: ['id', 'url', 'description'],
        include: {
            model: db.Group,
            where: { id: 1 },
            attributes: ['id', 'name', 'description'],
        },
        raw: true,
        nest: true
    })

    // console.log('>>>> new User', newUser);
    // console.log('>>>> new role', roles);

    let users = []

    try {
        // const [result, fields] = await connection.execute(`
        //     SELECT * FROM user    
        // `)
        // return result

        users = await db.User.findAll()
        return users
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (userId) => {

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    try {
        // await connection.execute(`
        //     DELETE FROM user WHERE id = ?
        // `, [id])

        await db.User.destroy({
            where: { id: userId }
        });
    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    let user = {}

    try {
        // let [reuslt, fields] = await connection.execute(`
        //     SELECT * FROM user WHERE id = ?
        // `, [id])

        // reuslt = reuslt && reuslt.length > 0 ? reuslt[0] : {}
        // return reuslt
        user = await db.User.findOne({ where: { id: userId } })
        return user
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (username, email, userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    try {
        // await connection.execute(`
        //   UPDATE user SET email = ?, username = ? WHERE id = ?
        // `, [email, username, id])

        await db.User.update(
            { email: email, username: username },
            {
                where: {
                    id: userId,
                },
            },
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUser
}

