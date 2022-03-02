const express = require('express')
const router = express.Router()
const Commerce = require('../models/Commerce')

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};


// crear categorias para el comercio
router.post('/categories/new-categorie/:commerce',   async (req,res) => {
    
    try{
        if (Commerce.find({name: req.params.commerce})) {
            let comercio = await Commerce.findOne({name: req.params.commerce}).lean()
            req.body.id = mongoObjectId()
            comercio.categories.push(req.body)
            await Commerce.findOneAndUpdate({name: req.params.commerce}, comercio)
            
            res.send('se a creado la categoria')
        } else {
            console.log('no se encontrol', req.params.commerce);
        }
    } catch(error){
        res.send(error)
    }
})



// obtener todos las categorias del comercio
router.get('/categories/commerce/:name', async (req, res) => {
    console.log(req.params.name);
    const commerce = await Commerce.findOne({name: req.params.name}).lean()
    if (commerce) {
        res.send(commerce.categories)
    } else {
        res.send('no hay categorias')
    }
})



// editar categoria del comercio
router.put('/category-update/:commerce', async (req, res) => {
    try {
        let { commerce } = req.params
        let comercio = await Commerce.findOne({name: commerce}).lean()
        await comercio.categories.forEach((element, index) => {
            if (element.id == req.body.id) {
                comercio.categories[index] = req.body
                console.log(comercio.categories[index]);
            }
        });
        await Commerce.findOneAndUpdate({name: commerce}, comercio)
        res.send('comercio actualizado')
    } catch (error) {
        res.send('No existe el comercio')
    }
})

module.exports = router