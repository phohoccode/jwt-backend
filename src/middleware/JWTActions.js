import jwt from 'jsonwebtoken'
require('dotenv').config()

const nonSecurePaths = ['/', '/login', '/register']

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
    let decoded = null

    try {
        decoded = jwt.verify(token, key)
    } catch (error) {
        console.log(error)
    }

    return decoded
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next()
    }

    const cookies = req.cookies

    if (cookies && cookies.phohoccode) {
        const token = cookies.phohoccode
        const decoded = verifyToken(token)

        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EC: 1,
                EM: 'Người dùng chưa đăng nhập!',
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: 1,
            EM: 'Người dùng chưa đăng nhập!',
            DT: ''
        })
    }
}

const checkUserPermisstion = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') {
        return next()
    }

    if (req.user) {
        const email = req.user.email
        const roles = req.user.groupWithRoles.Roles
        const currentUrl = req.path

        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: 1,
                EM: 'Người dùng không có quyền truy cập!',
                DT: ''
            })
        }

        const canAccess = roles.some((role) => role.url === currentUrl)

        if (canAccess) {
            next()
        } else {
            return res.status(403).json({
                EC: 1,
                EM: 'Người dùng không có quyền truy cập!',
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: 1,
            EM: 'Người dùng chưa đăng nhập!',
            DT: ''
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermisstion
}