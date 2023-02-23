const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    nama_item: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        enum: ['kg', 'pcs'],
        required: true
    },
    stok: {
        type: Number,
        required: true
    },
    harga_satuan: {
        type: Number,
        required: true
    },
    gambar: {
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('item', Item);