require('dotenv').config()
import db from '../models'
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from '../service/JWTService'
import { createJWT } from '../middleware/JWTActions'

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

        const isEmailExist = await checkEmailExist(rawUserData.email)
        const isPhoneExist = await checkPhoneExist(rawUserData.phone)

        if (isEmailExist) {
            return {
                EM: 'Địa chỉ email đã tồn tại!',
                EC: 1
            }
        }

        if (isPhoneExist) {
            return {
                EM: 'Số điện thoại đã tồn tại!',
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
        console.log('>>> loginRegisterService-rawData:\n', rawData)
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
                console.log('>>> loginRegisterService-groupWithRoles:', groupWithRoles)
                const payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRoles
                }

                console.log('>>> loginRegisterService-payload:\n', payload)

                const token = createJWT(payload)
                console.log('>>> loginRegisterService-token:\n', token)
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
            EM: 'Email/Phone or password is inccorect!',
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

module.exports = {
    registerNewUser, handleUserLogin, hashPassword, checkEmailExist, checkPhoneExist, checkPassword
}