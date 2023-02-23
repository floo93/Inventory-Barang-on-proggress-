const random = require('random-string');
const Sales = require('../models/M_Sales.js');
const Item = require('../models/M_Item.js');

const createTransaction = async (req, res, next) => {
    statusCode = 201;

    try {
        
        const dataCust = req.cookies.data.nama;
        const total_diskon = req.cookies.data.diskon;
        const code_transaksi = random();
        const item = await Item.findOne({ name: 'nama_item' });


        const customer = dataCust;
        const { qty, total_bayar } = req.body;
        const total_harga = total_bayar - total_diskon;
  
        const transaction = new Sales({
        code_transaksi, customer, item, qty, total_diskon, total_harga, total_bayar
      });  
        await transaction.save();

        res.status(201).json({ 
           message: 'Transactions Success',
           statusCode: statusCode,
           data: transaction
    });
    } catch (error) {
        next(error);
    }
};

module.exports = createTransaction;