import express from 'express'

import { testApi, handleRegister } from '../controllers/apiController'

const router = express.Router()

const initApiRoutes = (app) => {

    router.get('/test-api', testApi)
    router.post('/register', handleRegister)

    // kết nối tất cả router đã định nghĩa ở phía trên
    return app.use('/api/v1', router) 
}

export default initApiRoutes