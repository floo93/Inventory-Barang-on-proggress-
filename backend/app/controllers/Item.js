const fs = require('node:fs');
const {unlink} = require('node:fs');
const path =  require('node:path');
const {validationResult} = require('express-validator');
const Item = require('../models/M_Item.js');

const createItem = async (req, res, next) => {
    statusCode = 201;

    try {
        const custdata = req.cookies.user.data.nama;
        console.log(custdata);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Failed Creating Item');
            statusCode = 400;
            error.data = errors.array();
            throw error;
        }

        if (!req.file) {
            const error = new Error('Image Required!!!');
            statusCode = 422;
            throw error;
        }

        const {nama_item, unit, stok, harga_satuan} = req.body;
        const gambar = req.file.path;

        const data = new Item({
            nama_item, unit, stok, harga_satuan, gambar
        });
        await data.save();
        
        res.status(statusCode).json({
            message: 'Successfully Creating Item',
            statusCode: statusCode,
            data: data
        })
    } catch (error) {
        next(error);
    }
}

const readItem = async (req, res, next) => {
    statusCode = 200;

    try {
        const custnama = req.cookies.data.nama;
        const custdiskon = req.cookies.data.diskon;
        console.log(custnama);
        console.log(custdiskon);
        const loadItem = await Item.find();
        res.status(statusCode).json({
            message: 'Successfully Get All Item',
            statusCode: statusCode,
            data: loadItem
        })
    } catch (error) {
        next(error);
    }
}

const readItemId = async (req, res, next) => {
    statusCode = 200;

    try {
        const id = req.params.id;
        const itemId = await Item.findById(id);

        if (!itemId) {
            const error = new Error('Data Item Not Found');
            statusCode = 404;
            throw error;
        }

        res.status(statusCode).json({
            message: 'Successfully Get Id Item',
            statusCode: statusCode,
            data: itemId
        })
    } catch (error) {
        next(error);        
    }
}

const updateItem = async (req, res, next) => {
    statusCode = 201;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Failed Updating Item');
            statusCode = 400;
            error.data = errors.array();
            throw error;
        }

        if (!req.file) {
            const error = new Error('Image Required!!!');
            statusCode = 422;
            throw error;
        }

        const id = req.params.id;
        const update = await Item.findById(id);
        const {nama_item, unit, stok, harga_satuan} = req.body;
        const gambar = req.file.path;

        if (!update) {
            const error = new Error('Data Customer Not Found');
            statusCode = 404;
            throw error;
        }

        update.nama_item = nama_item;
        update.unit = unit;
        update.stok = stok;
        update.harga_satuan = harga_satuan;
        removeImageItem(update.gambar);
        update.gambar = gambar;
        await update.save();

        res.status(statusCode).json({
            message: 'Sucessfully Updating Item',
            statusCode: statusCode,
            data: update
        })
    } catch (error) {
        next(error);        
    }
}


const removeItem = async (req, res, next) => {
    statusCode = 200;

    try {
        const id = req.params.id;
        const removeDataItem = await Item.findById(id);

        if (!removeDataItem) {
            const error = new Error('Data Item Not Found');
            statusCode = 404;
            throw error;
        }

        removeImageItem(removeDataItem.gambar);
        await Item.findByIdAndRemove(id);
        res.status(statusCode).json({
            message: 'Successfully Delete Item',
            statusCode: statusCode,
            data: removeDataItem
        })
    } catch (error) {
        next(error);
    }
}

const removeImageItem = (imageItemPath) => {
    imageItemPath = path.join(__dirname, '../../', imageItemPath);
    fs.unlink(imageItemPath, (err) => console.log(err));
}

module.exports = {createItem, readItem, readItemId, removeItem, updateItem};