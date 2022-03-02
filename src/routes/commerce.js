const express = require('express')
const router = express.Router()
const Commerce = require('../models/Commerce')
const { route } = require('./products')


// crear comercio


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
        console.log('los comercios son');
        res.send(commerce)
    } catch (error) {
        res.send('ocurrio algo inesperado')
    }
})

// eliminar comercio
router.delete('/commerce-delete/:id', async (req, res) => {
    try {
        let { id } = req.params
        const commerce = await Commerce.findByIdAndDelete(id)
        res.send(commerce)
    } catch (error) {
        res.send('hay un error con el parametro enviado')
    }
})


// editar comercio
router.put('/commerce-update/:id', async (req, res) => {
    try {
        let { id } = req.params
        const commerce = await Commerce.findByIdAndUpdate(id, req.body)
        res.send(commerce)
    } catch (error) {
        res.send('No existe el comercio')
    }
})





module.exports = router