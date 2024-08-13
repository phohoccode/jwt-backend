import express from 'express'
import { getHomePage, getUserPage, handleCreateNewUser } from '../controllers/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', getHomePage)
    router.get('/user', getUserPage)
    router.post('/users/create-user', handleCreateNewUser)

    return app.use('/', router)
}

export default initWebRoutes