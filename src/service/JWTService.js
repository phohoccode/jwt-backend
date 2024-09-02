import db from "../models"

const getGroupWithRoles = async (user) => {
    // console.log('>>> JWTService-groupId:\n', user.groupId)
    const roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ['id', 'name', 'description'],
        include: {
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: { attributes: [] }
        }
    })

    return roles ? roles : {}
}

module.exports = {
    getGroupWithRoles
}