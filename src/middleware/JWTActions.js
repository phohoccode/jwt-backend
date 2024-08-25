import jwt from 'jsonwebtoken'
require('dotenv').config()

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error)
    }
    return token
}

const verifyToken = (token) => {
    const key = process.env.JWT_SECRET
    let data = null

    try {
        const decoded = jwt.verify(token, key)
        data = decoded
    } catch (error) {
        console.log(error)
    }
    
    return data
}

module.exports = {
    createJWT, verifyToken
}