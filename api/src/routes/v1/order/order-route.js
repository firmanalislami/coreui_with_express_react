const express = require('express');
const models = require('../../../models');
const validationMiddleware = require('../../../../utilities/validation-middleware');
const validateOrder = require('./order-validation');
const router = express.Router();

router.get('/', async (req,res) => {
    const { product,order } = models;
   
    const results = await order.findAll({ include: [product]});
    res.status(200).send({
        status: 200,
        message: 'OK',
        data: results,
    });
});


router.post('/', validationMiddleware(validateOrder), async (req,res) => {
    const results = req.body;
    const { order } = models;
    try {
        const newOrder = await order.create(results);
        res.status(201).send({
            status: 201,
            message: 'CREATED',
            data: newOrder,
        });
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
module.exports = router;