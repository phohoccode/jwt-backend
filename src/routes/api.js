import express from 'express'

import { handleRegister, handleLogin } from '../controllers/apiController'
import { readFuc, updateFuc, deleteFuc, createFuc, getUserAccount } from '../controllers/userController'
import { readGroupFunc } from '../controllers/groupController'
import { checkUserJWT, checkUserPermisstion } from '../middleware/JWTActions'

const router = express.Router()


const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermisstion)

    router.post('/register', handleRegister)
    router.post('/login', handleLogin)
    router.get('/account', getUserAccount)

    router.get('/user/read', readFuc)
    router.post('/user/create', createFuc)
    router.put('/user/update', updateFuc)
    router.delete('/user/delete', deleteFuc)

    router.get('/group/read', readGroupFunc)

    return app.use('/api/v1', router)
}

export default initApiRoutes