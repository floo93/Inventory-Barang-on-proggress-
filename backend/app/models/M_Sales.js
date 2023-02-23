const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sales = new Schema({
    code_transaksi: {
        type: String,
        required: true
    },
    tanngal_transaksi: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: String,
        required: true
    },
    item: [{
        type: String,
        ref: 'item'
    }],
    qty: [{
      type: Number,
      required: true  
    }],
    total_diskon: {
        type: Number,
        required: true
    },
    total_harga: {
        type: Number,
        required: true
    },
    total_bayar: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('sales', Sales);
