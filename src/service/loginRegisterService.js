import db from '../models'
import bcrypt from 'bcryptjs';
import { Op, where } from 'sequelize';

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
                EM: 'The email is already exist!',
                EC: 1
            }
        }

        if (isPhoneExist) {
            return {
                EM: 'The phone is already exist!',
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
            password: hashPass
        })

        return {
            EM: 'A user is created successfully!',
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
        
        if (user) {
            console.log('>>> user', user)
            const isCorrectPass = checkPassword(rawData.password, user.password)

            if (isCorrectPass) {
                return {
                    EM: 'Ok!',
                    EC: 0,
                    DT: ''
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
    registerNewUser, handleUserLogin
}