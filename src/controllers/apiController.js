import { registerNewUser, handleUserLogin } from "../service/loginRegisterService"

const handleRegister = async (req, res) => {
    // EM: error message, EC: error code, DT: data
    try {

        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing requied paramters',
                EC: '1',
                DT: ''
            })
        }

        if (req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Password length must be more than 3 letters',
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
    handleLogin
}