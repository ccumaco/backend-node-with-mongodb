const express = require('express')
const router = express.Router()
const Product = require('../models/Product');


//crear producto
router.post('/products/new-product', async (req,res) => {
    let { image , description, active,name,stok,price} = req.body
    const productExist = await Product.find({name: name}).lean()
    // const allProducts = await Product.find().lean()
    const errors = []
    // _id = 0
    //asigna auto incremental a los productos en el id
    if(productExist.length > 0) {
        console.log('entr1');
        errors.push({alert: 'Ya existe un producto con ese nombre'})
    }
    // if(allProducts.length > 0) {
    //     console.log('entro2');
    //     _id = _id + allProducts.length
    // }
    if (!description || !name) {
        console.log('entro3');
        errors.push({alert: 'falta llenar los campos'})
    }
    if (errors.length > 0) {
        res.send(errors)
    } else {
        const newProduct = new Product({image , description, active,name,stok,price})
        await newProduct.save();
        res.send('se creo el producto con exito')
    }
})



//obtener productos del comercio
router.get('/products/commerce/:name', async (req, res) => {
    let { name } = req.params
    console.log(name);
    const products = await Product.find().lean()
    res.json(products)
})

//obtener producto en espesifico
router.get('/products/:name', async (req, res) => {
    try {
        let { name } = req.params
        const product = await Product.find({name: name}).lean()
        res.send(product[0])
    } catch (error) {
        res.send('hay un error con el parametro enviado')
    }

})

router.post('/products/status/:_id',  async (req, res) => {
    const { _id } = req.params
    try {
        await Product.updateOne({_id: _id}, req.body)
        console.log(req.body);
        res.send('updated' + req.body);
    } catch (error) {
        res.send('ocurrio un error');
    }
});


//editar producto
router.put('/update/product/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await Product.updateOne({_id: _id}, req.body)
        res.send('Producto Actualizado' + req.body);
    } catch (error) {
        res.send('occurio un error');
    }
});


//eliminar producto
router.delete('/delete/product/:_id', async (req, res, next) => {
    const { _id } = req.params;
    try {
        await Product.deleteOne({_id: _id});
        res.send('Producto eliminado');
    } catch (error) {
        res.send('parametro invalido');
    }
});

module.exports = router