import { createNewUser, getUserList, deleteUser, getUserById, updateUser } from '../service/userService'

const getHomePage = (req, res) => {
    res.render('home.ejs')
}

const getUserPage = async (req, res) => {
    const userList = await getUserList()

    res.render('user.ejs', { userList })
}

const handleCreateNewUser = (req, res) => {
    const { username, email, password } = req.body
    
    createNewUser(username, email, password)
    res.redirect('/user')
}

const handleDeleteUser = (req, res) => {
    const id = req.params.id

    deleteUser(id)
    res.redirect('/user')
}

const getUpdateUser = async (req, res) => {
    const id = req.params.id
    const user = await getUserById(id)

    res.render('user-update.ejs', { user })
}

const handleUpdateUser = (req, res) => {
    const { username, email, id } = req.body

    updateUser(username, email, id)
    res.redirect('/user')
}

module.exports = {
    getHomePage, getUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUser, handleUpdateUser
}