import express from 'express'
import { getHomePage, getUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUser, handleUpdateUser } from '../controllers/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', getHomePage)
    router.get('/user', getUserPage)
    router.get('/update-user/:id', getUpdateUser)

    router.post('/users/create-user', handleCreateNewUser)
    router.post('/delete-user/:id', handleDeleteUser)
    router.post('/users/update-user', handleUpdateUser)

    // kết nối tất cả router đã định nghĩa ở phía trên
    return app.use('/', router) 
}

export default initWebRoutes