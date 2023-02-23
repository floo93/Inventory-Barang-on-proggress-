const express = require('express');
const { nama, contact, email } = require('../config/Validator.js');
const custRoutes = express.Router();
const { readCustomer, createCustomer, removeCustomer, updateCustomer } = require('../controllers/Customer.js');

custRoutes.get('/v1/customer', readCustomer);
custRoutes.post('/v1/customer/register', nama,contact,email, createCustomer);
custRoutes.put('/v1/customer/:id', nama,contact,email, updateCustomer);
custRoutes.delete('/v1/customer/:id', removeCustomer);

module.exports = custRoutes;