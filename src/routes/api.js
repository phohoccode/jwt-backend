import express from 'express'

import { testApi, handleRegister, handleLogin } from '../controllers/apiController'

const router = express.Router()

const initApiRoutes = (app) => {

    router.get('/test-api', testApi)
    router.post('/register', handleRegister)
    router.post('/login', handleLogin)

    // kết nối tất cả router đã định nghĩa ở phía trên
    return app.use('/api/v1', router) 
}

export default initApiRoutes