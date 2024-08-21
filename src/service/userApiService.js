import db from "../models";

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
                EM: 'get data success',
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
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: {
                model: db.Group,
                attributes: ['id', 'name', 'description']
            },
            offset: offset,
            limit: limit
        })

        const totalPages = Math.ceil(count / limit)

        const data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'ok',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with server',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create(data)
        
        return {
            EM: ' create ok',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with server',
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        const user = db.User.findOne({
            where: { id: data.id }
        })

        if (user) {
            user.save({

            })
        } else {

        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with server',
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
                EM: 'delete use success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'user not exists',
                EC: 2,
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with server',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, getUserWithPagination, createNewUser, updateUser, deleteUser
}