import db from "../models"

const checkDuplicateRole = async (oldRole, newRole) => {
    if (oldRole.url === newRole.url) {
        return false
    }

    const isExistsRole = await db.Role.findOne({
        where: { url: newRole.url }
    })

    return !!isExistsRole
}

const createNewRoles = async (roles) => {
    try {
        const currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })

        // kiểm tra các phần tử khác nhau 
        const persists = roles.filter(
            ({ url }) => !currentRoles.some(
                ({ url: existingUrl }) => existingUrl === url
            ));

        // console.log('>>> groupApiService-createNewGroup-persists: ', persists)

        if (persists.length === 0) {
            return {
                EM: 'Quyền hạn bị trùng khớp!',
                EC: 0,
                DT: []
            }
        } else {
            await db.Role.bulkCreate(persists)
            return {
                EM: `Tạo ${persists.length} quyền hạn thành công!`,
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try {
        const data = await db.Role.findAll()

        return {
            EM: 'Lấy danh sách quyền hạn thành công!',
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const deleteRole = async (idRole) => {
    try {
        await db.Role.destroy({
            where: { id: idRole }
        })

        return {
            EM: 'Xoá quyền hạn thành công!',
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const updateRole = async (data) => {
    try {
        const role = await db.Role.findOne({
            where: { id: data.id }
        })

        if (!role) {
            return {
                EM: 'Không tìm thấy quyền hạn!',
                EC: 0,
                DT: ''
            }
        }

        const check = await checkDuplicateRole(role, data)

        if (check) {
            return {
                EM: 'Quyền hạn đã tồn tại!',
                EC: 1,
                DT: ''
            }
        } else {
            await role.update({
                url: data.url,
                description: data.description
            })
            return {
                EM: 'Cập nhật quyền hạn thành công!',
                EC: 0,
                DT: ''
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const getRolesByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any roles!',
                EC: 0,
                DT: []
            }
        }

        const roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }
        })

        console.log('>>> roleApiService-getRolesByGroup-roles:\n', roles)
        console.log('>>> roleApiService-getRolesByGroup-Roles:\n', roles.Roles)

        return {
            EM: 'Lấy danh sách quyền hạn thành công!',
            EC: 0,
            DT: roles
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })

        await db.Group_Role.bulkCreate(data.groupRoles)
        return {
            EM: 'Chỉnh sửa quyền hạn của nhóm thành công!',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles, getAllRoles, deleteRole, updateRole, getRolesByGroup, assignRoleToGroup
}