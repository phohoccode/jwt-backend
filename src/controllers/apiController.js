const testApi = (req, res) => {
    res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing requied paramters',
                EC: '1',
                DT: ''
            })
        }

        return res.status(200).json({
            EM: `A user is created successfully!`,
            EC: '0',
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


module.exports = {
    testApi,
    handleRegister
}