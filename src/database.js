const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/crud-ecommerce')

    .then(db => console.log('DB is coneccted'))
    .catch(err => console.log(err, 'error in database'))