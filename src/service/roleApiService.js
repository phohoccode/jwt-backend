import db from "../models"

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
        
        console.log('>>> groupApiService-createNewGroup-persists: ', persists)

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

module.exports = {
    createNewRoles
}