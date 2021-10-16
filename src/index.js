const express = require('express')
const path = require('path')
var cors = require('cors');
//Initializations
const app = express()
require('./database')
//settings

app.use(cors());
app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))

app.set('view engine', '.hbs')

//middlewares


//global variables

//routes
console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);

app.use(require('./routes/categories'))
app.use(require('./routes/products'))
app.use(require('./routes/index'))

//static files


app.use(express.static(path.join(__dirname + '/public')))
//server is listening

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})