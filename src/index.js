
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    express = require('express'),
    cors = require('cors')

//Initializations
const app = express()
require('./database')
//settings

app.use(cors());
app.set('port', process.env.PORT || 3000)


// app.set('view engine', '.hbs')

//middlewares


//global variables

//routes

app.use(require('./routes/categories'))
app.use(require('./routes/products'))

//server is listening

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})