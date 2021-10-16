const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')

    .then(db => console.log('DB is coneccted'))
    .catch(err => console.log(err, 'error'))