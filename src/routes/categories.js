const express = require('express')
const router = express()
const body_parser = require('body-parser');
var jsonParser = body_parser.json()
const Categorie = require('../models/Categorie')


router.post('/categories/new-categorie', jsonParser,  async (req,res) => {
    const { image , description, active,name,stok,price} = req.body
    const errors = []
    if (!description || !name) {
        errors.push({alert: 'falta llenar los campos'})
    }
    if (errors.length > 0) {
        res.send(errors)
    } else {
        const newCategorie = new Categorie({image , description, active,name,stok,price})
        await newCategorie.save();
    }
})

router.get('/categories', async (req, res) => {
    const categories = await Categorie.find().lean()
    res.json(categories)
    
})
router.get('/categories/:id', async (req, res) => {
    const categorie = await Categorie.find({_id: req.params.id}).lean()
    res.send(categorie[0])
})

router.post('/categories/status/:name', jsonParser, async (req, res) => {
    const { name } = req.params
    await Categorie.updateOne({name: name}, req.body)
    console.log(req.body);
    res.send('updated' + req.body);
  });

router.post('/categories/:id', jsonParser, async (req, res) => {
    const { id } = req.params
    await Categorie.updateOne({_id: id}, req.body)
    res.send('updated' + req.body);
  });
router.get('/delete/categories/:id', async (req, res, next) => {
    const { id } = req.params;
    await Categorie.deleteOne({_id: id});
    res.send('delete' + req.body)
});

module.exports = router