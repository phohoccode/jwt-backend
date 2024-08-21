import db from "../models"

const getGroup = async () => {
    try {
        const data = await db.Group.findAll({
            order: [['name', 'asc']]
        })
        return {
            EM: 'get group success',
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

module.exports = {
    getGroup
}