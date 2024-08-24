import { getAllUser, getUserWithPagination, createNewUser, updateUser, deleteUser } from '../service/userApiService'

const readFuc = async (req, res) => {
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

const createFuc = async (req, res) => {
    try {
        const data = await createNewUser(req.body)
        
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

const updateFuc = async (req, res) => {
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

const deleteFuc = async (req, res) => {
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
    readFuc, createFuc, updateFuc, deleteFuc
}