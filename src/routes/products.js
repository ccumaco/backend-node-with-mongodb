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
router.get('/products/:id', async (req, res) => {
    const product = await Product.find({_id: req.params.id}).lean()
    console.log(product[0]);
    res.send(product[0])
})

// router.put('/products/:id', async (req, res) => {
//     const { image , description, active,name,stok,price} = req.body
//     console.log(req.body);
//     // console.log(product.name);

//     // Product.updateOne(myquery, newvalues, function(err, res) {
//     //     if (err) throw err;
//     //     console.log("1 document updated");
//     //     db.close();
//     //   });
//     res.send('Got a PUT request at /user');
//   });

module.exports = router