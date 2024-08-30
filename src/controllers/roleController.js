import { getAllUser, getUserWithPagination, createNewUser, updateUser, deleteUser } from '../service/userApiService'
import { createNewRoles } from '../service/roleApiService'

const readRoleFuc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            const { page, limit } = req.query
            const data = await getUserWithPagination(+page, +limit)

            // trả data về client
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            const data = await getAllUser()

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Lỗi từ máy chủ!',
            EC: '-1',
            DT: ''
        })
    }
}

const createRoleFuc = async (req, res) => {
    try {
        const data = await createNewRoles(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (error) {
        return res.status(500).json({
            EM: 'Lỗi từ máy chủ',
            EC: '-1',
            DT: ''
        })
    }
}

const updateRoleFuc = async (req, res) => {
    try {
        const data = await updateUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (error) {
        return res.status(500).json({
            EM: 'Lỗi từ máy chủ',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteRoleFuc = async (req, res) => {
    try {
        const data = await deleteUser(req.body.id)
        console.log(data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'Lỗi từ máy chủ',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    readRoleFuc, createRoleFuc, updateRoleFuc, deleteRoleFuc
}