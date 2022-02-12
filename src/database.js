const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Borking:Borking2001@first-project.pkvnl.mongodb.net/myFirstDatabase')

    .then(db => console.log('DB is coneccted'))
    .catch(err => console.log(err, 'error in database'))