const express = require('express');
const router = express.Router();
const product = require('./product');
const order = require('./order');
router.use('/product', product);
router.use('/order', order);
module.exports = router;
