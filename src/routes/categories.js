const express = require('express')
const router = express.Router()
const body_parser = require('body-parser');
var jsonParser = body_parser.json()
const Categorie = require('../models/Categorie')


router.post('/categories/new-categorie', jsonParser,  async (req,res) => {
    const { name, image, description, products, active, promotion } = req.body
    const categoriExist = await Categorie.find({name: name}).lean()
    const errors = []
    if (!name) {
        errors.push({name: 'Por favor llene el campo de nombre'})
    } 
    if(categoriExist.length > 0) {
        errors.push({exist: 'Ya existe una categoría con ese nombre'})
    }
    if (!description) {
        errors.push({description: 'Por favor llene el campo de descripcion'})
    }
    
    if (errors.length > 0) {
        res.send(errors)
    } else {
        const newCategorie = new Categorie({name, image, description, products, active, promotion})
        await newCategorie.save();
        await res.send({success: 'se creo la categoria con exito'})
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