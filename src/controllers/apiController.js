require('dotenv').config()
import {
    registerNewUser,
    handleUserLogin,
    handleUserFindAccount,
    handleResetPassword
} from "../service/loginRegisterService"

const handleRegister = async (req, res) => {
    // EM: error message, EC: error code, DT: data
    try {

        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Thiếu thông số bắt buộc!',
                EC: '1',
                DT: ''
            })
        }

        if (req.body.phone.length < 10) {
            return res.status(200).json({
                EM: 'Độ dài số điện thoại phải đủ 10 kí tự',
                EC: '1',
                DT: ''
            })
        }

        if (req.body.password.length < 9) {
            return res.status(200).json({
                EM: 'Độ dài mật khẩu phải nhiều hơn 8 kí tự!',
                EC: '1',
                DT: ''
            })
        }

        // create user
        const dataUser = await registerNewUser(req.body)

        return res.status(200).json({
            EM: dataUser.EM,
            EC: dataUser.EC,
            DT: ''
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        const data = await handleUserLogin(req.body)
        if (data && data.DT.access_token) {
            res.cookie('phohoccode', data.DT.access_token, { httpOnly: true, maxAge: 3600000 })
        }

        // console.log('>>> apiController-data:\n',data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie("phohoccode")
        return res.status(200).json({
            EM: 'Đăng xuất thành công',
            EC: 0,
            DT: ''
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const handleFindAccount = async (req, res) => {
    try {
        const data = await handleUserFindAccount(req.body.data)

        if (data && data.DT.token_id) {
            res.cookie('id', data.DT.token_id, { httpOnly: true, maxAge: 3600000 })
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const tokenId = req.cookies.id
        const data = await handleResetPassword(tokenId, req.body.data)
 
        res.clearCookie(process.env.JWT_SECRET)
        res.clearCookie('id')

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout, handleFindAccount, resetPassword
}