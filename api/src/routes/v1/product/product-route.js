const express = require('express');
const models = require('../../../models');
const validationMiddleware = require('../../../../utilities/validation-middleware');
const validateProduct = require('./product-validation');
const router = express.Router();

router.get('/', async (req, res) => {
    const { product } = models;
    const results = await product.findAll();
    res.status(200).send({
        status: 200,
        message: 'OK',
        data: results,
    });
});

router.get('/:id', async (req,res) => {
    const productId = req.params.id;
    const { product } = models;
    const results =  await product.findOne({where:{id:productId}});
    res.status(200).send({
        status: 200,
        message: 'OK',
        data: results,
    });
});
router.post('/', validationMiddleware(validateProduct), async (req, res) => {
    const results = req.body;
    const { product } = models;
    try {
        const newProduct = await product.create(results);
        res.status(201).send({
            status: 201,
            message: 'CREATED',
            data: newProduct,
        });
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});

router.put('/:id', validationMiddleware(validateProduct), async (req, res) => {
    const productId = req.params.id;
    const results = req.body;
    const { product } = models;
    try {
        const updateProduct = await product.update(results, //await untuk asyncronus
            { where: { id: productId } }
        )
        res.status(201).send({
            status: 201,
            message: 'UPDATED',
            data: updateProduct,
        });
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
router.delete('/:id', (req,res) => {
    const productId = req.params.id;
    //const result = req.body;
    const { product } = models;
    product.destroy({
        where: { id: productId }
      }).then(() => {
        res.status(200).json({msg: 'Deleted Successfully -> Customer Id: ' + productId});
      });
})
module.exports = router;