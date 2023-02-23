const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    nama: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    diskon: {
        type: Number,
        required: true
    },
    tipe_diskon: {
        type: String,
        enum: ['persentase', 'fix'],
        required: true
    },
    gambar: {
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('customer', Customer);