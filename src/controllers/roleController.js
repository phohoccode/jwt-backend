import {
    createNewRoles,
    getAllRoles,
    deleteRole,
    updateRole,
    getRolesByGroup,assignRoleToGroup
} from '../service/roleApiService'

const readRoleFuc = async (req, res) => {
    try {
        const data = await getAllRoles(req.body)

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

const deleteRoleFuc = async (req, res) => {
    try {
        console.log(req.body);

        const data = await deleteRole(req.body.id)
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

const updateRoleFuc = async (req, res) => {
    try {
        // console.log('>>> roleController-updateRole-req.body:', req.body);

        const data = await updateRole(req.body)

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

const getRolesByGroupFunc = async (req, res) => {
    try {
        console.log(req.body);

        const data = await getRolesByGroup(req.params.groupId)
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

const assignRoleToGroupFunc = async (req, res) => {
    try {
        const data = await assignRoleToGroup(req.body.data)
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
    readRoleFuc, createRoleFuc, deleteRoleFuc, updateRoleFuc, getRolesByGroupFunc, assignRoleToGroupFunc
}