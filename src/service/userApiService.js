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

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (error) {
        console.log(error);

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

    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: {id: id}
        })
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}