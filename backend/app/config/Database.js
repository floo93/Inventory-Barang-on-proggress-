const mongoose = require('mongoose');
require('dotenv').config();

const database = () => {
    const connection = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        mongoose.connect(process.env.MONGO_DB, connection);
    } catch (error) {
        console.log(error);
    }
}

module.exports = database;