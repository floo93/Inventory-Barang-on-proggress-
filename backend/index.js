const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('node:path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT;
const {fileConfig, Ext} = require('./app/config/Image.js');
const upload = multer({ storage: fileConfig, fileFilter: Ext });
const database = require('./app/config/Database.js');
const allRoutes = require('./app/routers/index.js');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(upload.single('gambar'));

app.use('/', allRoutes);


app.use((error, req, res, next) => {
    const status = statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message: message,
        statusCode: status,
        data: data
    })
    next();
})

if(database){
    database(app.listen(port));
    console.log(`Connection Success & Server Listening on Port ${port}`);
}else{
    console.log('Connection Failed');
}
