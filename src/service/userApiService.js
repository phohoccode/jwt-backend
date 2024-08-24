import db from "../models";

import { hashPassword, checkEmailExist, checkPhoneExist, checkPassword } from '../service/loginRegisterService'

const getAllUser = async () => {
    try {
        const data = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: {
                model: db.Group,
                attributes: ['id', 'name', 'description']
            },
        })

        if (data) {
            return {
                EM: 'Lấy dữ liệu thành công!',
                EC: 0,
                DT: data
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        const offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
            include: {
                model: db.Group,
                attributes: ['id', 'name', 'description']
            },
            offset: offset,
            limit: limit,
            order: [['id', 'desc']]
        })

        const totalPages = Math.ceil(count / limit)

        const data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'Lấy dữ liệu thành công!',
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

const createNewUser = async (data) => {
    try {
        const isEmailExist = await checkEmailExist(data.email)
        const isPhoneExist = await checkPhoneExist(data.phone)

        if (isEmailExist) {
            return {
                EM: 'Địa chỉ email đã tồn tại!',
                EC: 1,
                DT: 'email'
            }
        }

        if (isPhoneExist) {
            return {
                EM: 'Số điện thoại đã tồn tại!',
                EC: 1,
                DT: 'phone'
            }
        }

        const hashPass = hashPassword(data.password)

        await db.User.create({ ...data, password: hashPass })

        return {
            EM: 'Tạo người dùng thành công!',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        // if (!data.groupId) {
        //     return {
        //         EM: 'Nhóm người dùng không trống!',
        //         EC: 1,
        //         DT: 'group'
        //     }
        // }

        const user = await db.User.findOne({
            where: { id: data.id }
        })


        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })

            return {
                EM: 'Cập nhật người dùng thành công!',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Không tìm thấy người dùng',
                EC: 1,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        const user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            await user.destroy()

            return {
                EM: 'Xoá người dùng thành công!',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Người dùng không tồn tại',
                EC: 2,
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Có gì đó không ổn với máy chủ!',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, getUserWithPagination, createNewUser, updateUser, deleteUser
}