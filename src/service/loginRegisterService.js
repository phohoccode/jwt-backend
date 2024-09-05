require('dotenv').config()
import db from '../models'
import bcrypt from 'bcryptjs';
import { Op, where } from 'sequelize';
import { getGroupWithRoles } from '../service/JWTService'
import { createJWT, verifyToken } from '../middleware/JWTActions'

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const checkEmailExist = async (userEmail) => {
    const user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true
    }

    return false
}

const checkPhoneExist = async (userPhone) => {
    const phone = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (phone) {
        return true
    }

    return false
}

const registerNewUser = async (rawUserData) => {
    try {
        console.log(rawUserData)
        const isEmailExist = await checkEmailExist(rawUserData.email)
        const isPhoneExist = await checkPhoneExist(rawUserData.phone)

        if (isEmailExist || isPhoneExist) {
            return {
                EM: isEmailExist ? 'Địa chỉ email đã tồn tại!' : 'Số điện thoại đã tồn tại!',
                EC: 1
            }
        }

        // hash user password
        const hashPass = hashPassword(rawUserData.password)

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPass,
            groupId: 4
        })

        return {
            EM: 'Tạo người dùng thành công!',
            EC: 0
        }
    } catch (error) {
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }
}

const checkPassword = (inputPass, hashPass) => {
    return bcrypt.compareSync(inputPass, hashPass)
}

const handleUserLogin = async (rawData) => {
    try {
        // console.log('>>> loginRegisterService-rawData:\n', rawData)
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            },
            raw: true,
            nest: true
        })
        console.log('>>> loginRegisterService-user: ', user)

        if (user) {
            const isCorrectPass = checkPassword(rawData.password, user.password)

            if (isCorrectPass) {
                const groupWithRoles = await getGroupWithRoles(user)
                // console.log('>>> loginRegisterService-groupWithRoles:', groupWithRoles)
                const payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRoles
                }

                // console.log('>>> loginRegisterService-payload:\n', payload)
                const key = process.env.JWT_SECRET
                const token = createJWT(payload, key)
                // console.log('>>> loginRegisterService-token:\n', token)
                return {
                    EM: 'Đăng nhập thành công!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }

        return {
            EM: 'Thông tin tài khoản không chính xác!',
            EC: 1,
            DT: ''
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }
}

const handleUserFindAccount = async (data) => {
    try {
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: data },
                    { phone: data }
                ]
            },
            raw: true,
            nest: true
        })

        if (!user) {
            return {
                EM: 'Không tìm thấy tài khoản!',
                EC: 1,
                DT: ''
            }
        }

        console.log('user', user)
        const payload = {
            id: user.id
        }
        const token = createJWT(payload, 'id')

        return {
            EM: 'Đã tìm thấy tài khoản!',
            EC: 0,
            DT: {
                account: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                },
                token_id: token
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }
}

const handleResetPassword = async (tokenId, newPass) => {
    try {
        const decoded = verifyToken(tokenId, 'id')

        if (!decoded) {
            return {
                EM: 'Token không hợp lệ!',
                EC: 1,
                DT: ''
            }
        }

        if (decoded) {
            const user = await db.User.findOne({
                where: { id: decoded.id }
            })

            if (!user) {
                return {
                    EM: 'Không tìm thấy người dùng',
                    EC: 1,
                    DT: ''
                }
            }

            const hashPass = hashPassword(newPass)

            await user.update({
                password: hashPass
            })

            return {
                EM: 'Đổi mật khẩu thành công!',
                EC: 0,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashPassword,
    checkEmailExist,
    checkPhoneExist,
    checkPassword,
    handleUserFindAccount,
    handleResetPassword
}