import jwt from 'jsonwebtoken'
require('dotenv').config()

const nonSecurePaths = ['/', '/login', '/register', '/logout']

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
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

const extracToken = (req) => {
    // console.log('>>> JWTActions-extracToken-req.headers: ', req.headers)
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        // console.log('>>> JWTActions-checkUserJWT-path:', req.path)
        // console.log('>>> JWTActions-checkUserJWT: không qua middleware')
        return next()
    }

    // console.log('>>> JWTActions-checkUserJWT-path:', req.path)
    // console.log('>>> JWTActions-checkUserJWT: qua middleware')

    const cookies = req.cookies
    const tokenFromHeader = extracToken(req)

    // console.log('>>>JWTActions-checkUserJWT-cookies: ', cookies.phohoccode || null)
    // console.log('>>>JWTActions-checkUserJWT-tokenFromHeader: ', tokenFromHeader)

    if ((cookies && cookies.phohoccode) || tokenFromHeader) {
        const token = cookies.phohoccode ? cookies.phohoccode : tokenFromHeader
        const decoded = verifyToken(token)

        if (decoded) {
            // console.log('>>> JWTActions-checkUserJWT-decoded:\n', decoded)
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
        // return res.status(401).json({
        //     EC: 1,
        //     EM: 'Người dùng chưa đăng nhập!',
        //     DT: ''
        // })
    }
}

const checkUserPermisstion = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') {
        // console.log('>>> JWTActions-checkUserPermisstion-path:', req.path)
        // console.log('>>> JWTActions-checkUserPermisstion: không qua middleware')
        return next()
    }

    // console.log('>>> JWTActions-checkUserPermisstion-path:', req.path)
    // console.log('>>> JWTActions-checkUserPermisstion: qua middleware')

    if (req.user) {
        // console.log('>>> JWTActions-checkUserPermisstion-req.user: ', req.user)
        const email = req.user.email
        const roles = req.user.groupWithRoles.Roles
        const currentUrl = req.path

        if (!roles || roles.length === 0) {
            // console.log('>>> JWTActions-checkUserPermisstion-roles:', roles)
            return res.status(403).json({
                EC: 1,
                EM: 'Người dùng không có quyền truy cập!',
                DT: ''
            })
        }
        // console.log('>>> JWTActions-checkUserPermisstion-roles:', roles)
        const canAccess = roles.some((role) => role.url === currentUrl || currentUrl.includes(role.url))

        if (canAccess) {
            next()
            // console.log('>>> JWTActions-checkUserPermisstion-canAccess:', canAccess)
        } else {
            // console.log('>>> JWTActions-checkUserPermisstion-canAccess:', canAccess)
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