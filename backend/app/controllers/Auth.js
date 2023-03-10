const bcrypt = require('bcrypt');
const Customer = require('../models/M_Customer.js');

const login = async (req, res, next) => {
    statusCode = 200;

    try {
        const user = await Customer.findOne({nama: req.body.nama});
        if (!user) {
            const error = new Error('Customer Tidak Terdaftar');
            statusCode = 404;
            throw error;
        }

        const verifypassword = await bcrypt.compare(req.body.password, user.password);
        if (!verifypassword) {
            const error = new Error('Wrong Username/Password!!!');
            statusCode = 401;
            throw error;
        }

        res.cookie('data', user);
        res.status(statusCode).json({
            message: 'Data Found',
            statusCode: statusCode,
            data: user
        })
    } catch (error) {
        next(error);
    }
}

module.exports = login