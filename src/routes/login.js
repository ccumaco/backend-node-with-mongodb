const express = require('express')
const router = express.Router()
const body_parser = require('body-parser');
var jsonParser = body_parser.json()
const passport = require('passport')


router.get('/', async (req, res, next) => {
    console.log('hola mundo');
    res.send('hola mundo')
})

router.get('/signup', async (req, res, next) => {
    res.send('signup get')
})

router.post('/signup', jsonParser, passport.authenticate('local-signup',{
    successRedirect: '/signin',
    failureRedirect: '/signup',
    passReqToCallback: true
}), async (req, res, next) => {
    console.log(req.body);
    res.send('recibido')
})

router.get('/signin', async (req, res, next) => {
    res.send('signin get')
})

router.post('/signin', async (req, res, next) => {
    res.send('signin post')
})

module.exports = router