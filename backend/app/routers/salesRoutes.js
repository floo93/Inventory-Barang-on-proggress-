const express = require('express');
const createTransaction = require('../controllers/Sales');
const salesRoutes = express.Router();

salesRoutes.post('/v1/sales', createTransaction)

module.exports = salesRoutes;