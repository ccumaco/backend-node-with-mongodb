const express = require('express')
const router = express.Router()

const Product = require('../models/Product')


router.post('/products/new-product', async (req,res) => {
    const { image , description, active,name,stok,price} = req.body
    console.log(req.body,'req');
    const errors = []
    if (!description || !name) {
        errors.push({alert: 'falta llenar los campos'})
    }
    if (errors.length > 0) {
        res.send(errors)
    } else {
        const newProduct = new Product({image , description, active,name,stok,price})
        await newProduct.save();
        res.redirect('/products')
    }
})

router.get('/products', async (req, res) => {
    const products = await Product.find().lean()
    res.send(products)
})
module.exports = router