const express = require('express');
const allRoutes = express.Router();
const authRoutes = require('./authRoutes.js');
const custRoutes = require('./custRoutes.js');
const itemRoutes = require('./itemRoutes.js');
const salesRoutes = require('./salesRoutes.js');

allRoutes.use('/', authRoutes);
allRoutes.use('/', custRoutes);
allRoutes.use('/', itemRoutes);
allRoutes.use('/', salesRoutes);

module.exports = allRoutes;