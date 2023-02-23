const { body, check } = require('express-validator');

const nama = body('nama', 'Nama Customer Tidak Valid').isLength({min: 5});
const contact = check('contact', 'Contact Tidak Valid').isMobilePhone('id-ID');
const email = check('email', 'Email Tidak Valid').isEmail();

module.exports = {nama, contact, email};