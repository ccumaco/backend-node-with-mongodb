const express = require('express')
const router = express.Router()
const Commerce = require('../models/Commerce')


// crear comercio
router.post('/commerce/new-commerce', async (req, res) => {
    let { image , description, active,name,categories,promotion} = req.body
    const commerceExist = await Commerce.find({name: name}).lean()
    const errors = []
    try{
        if(commerceExist.length > 0) errors.push({alert: 'Ya existe un comercio con ese nombre'})
    
        if (!description) errors.push({alert: 'falta llenar la descripcion'})
    
        if (errors.length > 0) {
            res.send(errors)
        } else {
            const newCommerce = new Commerce({image , description, active,name,categories,promotion})
            await newCommerce.save();
            res.send('se creo el comercio con exito')
        }
    } catch(error){
        console.log(error);
    }
})

//obtener comercio
router.get('/commerce/:id', async (req, res) => {
    try {
        let { id } = req.params
        const commerce = await Commerce.findById(id).lean()
        res.send(commerce)
    } catch (error) {
        res.send('hay un error con el parametro enviado')
    }
})


// obtener todos los comercios
router.get('/commerces', async (req, res) => {
    try {
        const commerce = await Commerce.find().lean()
        res.send(commerce)
    } catch (error) {
        res.send('ocurrio algo inesperado')
    }
})

// eliminar comercio
router.delete('/commerce-delete/:id', async (req, res) => {
    try {
        let { id } = req.params
        await Commerce.findByIdAndDelete(id)
        res.send('comercio eliminado')
    } catch (error) {
        res.send('hay un error con el parametro enviado' + error)
    }
})


// editar comercio
router.put('/commerce-update/:id', async (req, res) => {
    try {
        let { id } = req.params
        await Commerce.findByIdAndUpdate(id, req.body)
        res.send('comercio actualizado')
    } catch (error) {
        res.send('No existe el comercio')
    }
})





module.exports = router