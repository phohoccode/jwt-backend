import express from 'express'

import { handleRegister, handleLogin, handleLogout } from '../controllers/apiController'
import { readFuc, updateFuc, deleteFuc, createFuc, getUserAccount } from '../controllers/userController'
import { readGroupFunc } from '../controllers/groupController'
import { checkUserJWT, checkUserPermisstion } from '../middleware/JWTActions'
import {
    readRoleFuc,
    createRoleFuc,
    deleteRoleFuc,
    updateRoleFuc,
    getRolesByGroupFunc,
    assignRoleToGroupFunc
} from '../controllers/roleController'

const router = express.Router()

const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermisstion)

    router.post('/register', handleRegister)
    router.post('/login', handleLogin)
    router.get('/account', getUserAccount)
    router.post('/logout', handleLogout)

    router.get('/user/read', readFuc)
    router.post('/user/create', createFuc)
    router.put('/user/update', updateFuc)
    router.delete('/user/delete', deleteFuc)

    router.get('/role/read', readRoleFuc)
    router.post('/role/create', createRoleFuc)
    router.delete('/role/delete', deleteRoleFuc)
    router.put('/role/update', updateRoleFuc)
    router.get('/role/by-group/:groupId', getRolesByGroupFunc)
    router.post('/role/assign-to-group', assignRoleToGroupFunc)

    router.get('/group/read', readGroupFunc)

    return app.use('/api/v1', router)
}

export default initApiRoutes