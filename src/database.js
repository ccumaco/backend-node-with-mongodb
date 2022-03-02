const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://Borking:Borking2001@first-project.pkvnl.mongodb.net/myFirstDatabase'
mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(db => console.log('DB is coneccted'))
    .catch(err => console.log(err, 'error in database'))