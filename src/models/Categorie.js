const mongoose = require('mongoose')
const { Schema} = mongoose

const CategorieSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    products: {type: String, required: false},
    active: {type: Boolean, required: true},
    promotion: {type: String, required: false}
})

module.exports = mongoose.model('Categorie', CategorieSchema)