const fs = require('node:fs');
const {unlink} = require('node:fs');
const path = require('node:path');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const Customer = require('../models/M_Customer.js');

const createCustomer = async (req, res, next) => {
    statusCode = 201;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Failed Creating User');
            statusCode = 400;
            error.data = errors.array();
            throw error;
        }

        if (!req.file) {
            const error = new Error('KTP Required!!!');
            statusCode = 422;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const {nama, contact, email, alamat,} = req.body;
        const password = hashPassword;
        let diskon = Math.floor(Math.random() * 10001)
        const tipe_diskon = 'fix';
        const gambar = req.file.path;

        const data = new Customer({
            nama, contact, password, email, alamat, diskon, tipe_diskon, gambar
        });
        await data.save();

        res.status(statusCode).json({
            message: 'Successfully Creating Customer',
            statusCode: statusCode,
            data: data
        });
    } catch (error) {
        next(error);
    }
}

const readCustomer = async (req, res, next) => {
    statusCode = 200;

    try {
        const load = await Customer.find();
        res.status(statusCode).json({
            message: 'Successfully Get Customer',
            statusCode: statusCode,
            data: load
        })
    } catch (error) {
        next(error);
    }
}

const updateCustomer = async (req, res, next) => {
    statusCode = 201;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Failed Updating Customer');
            statusCode = 400;
            error.data = errors.array();
            throw error;
        }

        if (!req.file) {
            const error = new Error('KTP Required!!!');
            statusCode = 422;
            throw error;
        }

        const id = req.params.id;
        const update = await Customer.findById(id);
        const {nama, contact, email, alamat} = req.body;
        const gambar = req.file.path;

        if (!update) {
            const error = new Error('Data Customer Not Found');
            statusCode = 404;
            throw error;
        }

        update.nama = nama;
        update.contact = contact;
        update.email = email;
        update.alamat = alamat;
        removeFile(update.gambar);
        update.gambar = gambar;
        await update.save();

        res.status(statusCode).json({
            message: 'Sucessfully Updating Customer',
            statusCode: statusCode,
            data: update
        })
    } catch (error) {
        next(error);        
    }
}

const removeCustomer = async (req, res, next) => {
    statusCode = 200;

    try {
        const id = req.params.id;
        const remove = await Customer.findById(id);

        if (!remove) {
            const error = new Error('Data Customer Not Found');
            statusCode = 404;
            throw error;
        }

        removeFile(remove.gambar);
        await Customer.findByIdAndRemove(id);
        res.status(statusCode).json({
            message: 'Successfully Delete Customer',
            statusCode: statusCode,
            data: remove
        })
    } catch (error) {
        next(error);        
    }
}

const removeFile = (pathway) => {
    pathway = path.join(__dirname, '../../', pathway);
    fs.unlink(pathway, (err) => console.log(err));
}

module.exports = {createCustomer, readCustomer, removeCustomer, updateCustomer};