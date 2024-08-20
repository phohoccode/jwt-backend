import { getAllUser, createNewUser, updateUser, deleteUser } from '../service/userApiService'

const readFuc = async (req, res) => {
    try {
        const data = await getAllUser()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const createFuc = (req, res) => {
    try {
        
    } catch (error) {
         return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const updateFuc = (req, res) => {
    try {
        
    } catch (error) {
         return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteFuc = (req, res) => {
    try {
        
    } catch (error) {
         return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    readFuc, createFuc, updateFuc, deleteFuc
}