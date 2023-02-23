const express = require('express');
const itemRoutes = express.Router();
const { readItem, readItemId, createItem, removeItem, updateItem } = require('../controllers/Item.js');

itemRoutes.get('/v1/barang', readItem);
itemRoutes.get('/v1/barang/:id', readItemId);
itemRoutes.post('/v1/barang', createItem);
itemRoutes.put('/v1/barang/:id', updateItem);
itemRoutes.delete('/v1/barang/:id', removeItem);

module.exports = itemRoutes;