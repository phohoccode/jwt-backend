import express from 'express'

import { testApi, handleRegister, handleLogin } from '../controllers/apiController'
import { readFuc, updateFuc, deleteFuc, createFuc } from '../controllers/userController'

const router = express.Router()

const initApiRoutes = (app) => {

    router.get('/test-api', testApi)
    router.post('/register', handleRegister)
    router.post('/login', handleLogin)

    router.get('/user/read', readFuc)
    router.post('/user/create', createFuc)
    router.put('/user/update', updateFuc)
    router.put('/user/delete', deleteFuc)

    return app.use('/api/v1', router) 
}

export default initApiRoutes