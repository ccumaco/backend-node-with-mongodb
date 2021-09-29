const express = require('express')
const router = express.Router()

const Product = require('../models/Product')


router.post('/products/new-product', async (req,res) => {
    const { image , description, active,name,stok,price} = req.body
    const errors = []
    if (!image || !description || !active || !name || !stok || !price) {
        errors.push({alert: 'falta llenar los campos'})
    }
    if (errors.length > 0) {
        res.send('errores', {errors})
    } else {
        const newProduct = new Product({title, description})
        await newProduct.save();
        res.redirect('/products')
    }
})

router.get('/products', async (req, res) => {
    const products = await Product.find().lean()
    res.send('vista productos')
})
module.exports = router