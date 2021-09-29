const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const body_parser = require('body-parser');
//Initializations
const app = express()
require('./database')
//settings

app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.use(body_parser.urlencoded({extended:true}));

app.set('view engine', '.hbs')

//middlewares

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

//global variables

//routes

app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))
app.use(require('./routes/products'))

//static files


app.use(express.static(path.join(__dirname + '/public')))
//server is listening

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})