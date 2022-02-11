const express = require('express')
const router = express.Router()
const body_parser = require('body-parser');
var jsonParser = body_parser.json()
const Product = require('../models/Product');
const Categorie = require('../models/Categorie')

router.post('/products/new-product', jsonParser,  async (req,res) => {
    let { image , description, active,name,stok,price,_id} = req.body
    const productExist = await Product.find({name: name}).lean()
    const allProducts = await Product.find().lean()
    const errors = []
    _id = 0
    //asigna auto incremental a los productos en el id
    if(productExist.length > 0) {
        errors.push({alert: 'Ya existe un producto con ese nombre'})
    }
    if(allProducts.length > 0) {
        _id = _id + allProducts.length
    }
    if (!description || !name) {
        errors.push({alert: 'falta llenar los campos'})
    }
    if (errors.length > 0) {
        res.send(errors)
    } else {
        const newProduct = new Product({_id,image , description, active,name,stok,price})
        await newProduct.save();
        res.send('se creo el producto con exito')
    }
})

router.get('/products', async (req, res) => {
    const products = await Product.find().lean()
    res.json(products)
    
})


router.get('/products/:name', async (req, res) => {
    try {
        let { name } = req.params
        const product = await Product.find({name: name}).lean()
        res.send(product[0])
    } catch (error) {
        res.send('hay un error con el parametro enviado')
    }

})

router.post('/products/status/:name', jsonParser, async (req, res) => {
    const { name } = req.params
    await Product.updateOne({name: name}, req.body)
    console.log(req.body);
    res.send('updated' + req.body);
  });

router.post('/products/:id', jsonParser, async (req, res) => {
    const { id } = req.params
    await Product.updateOne({_id: id}, req.body)
    res.send('updated' + req.body);
  });
router.get('/delete/products/:id', async (req, res, next) => {
    const { id } = req.params;
    await Product.deleteOne({_id: id});
    res.send('delete' + req.body)
});

module.exports = router