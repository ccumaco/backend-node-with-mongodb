const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    console.log('hola mundo');
    
})
module.exports = router