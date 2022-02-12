
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

//Initializations
const app = express()
require('./database')
// require('./passport/local-auth')


//settings
app.use(cors());
app.set('port', process.env.PORT || 3000)


//middlewares
app.use(session({
    secret: 'mysecretapp',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))

//global variables

//routes
app.use(require('./routes/categories'))
app.use(require('./routes/products'))
app.use(require('./routes/login'))

//server is listening
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})