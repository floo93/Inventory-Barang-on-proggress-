const express = require('express');
const authRoutes = express.Router();
const { nama} = require('../config/Validator.js');
const login = require('../controllers/Auth.js');

authRoutes.post('/v1/customer/login', nama, login);

module.exports = authRoutes;