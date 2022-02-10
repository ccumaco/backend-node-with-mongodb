const mongoose = require('mongoose')
const { Schema} = mongoose

const CategorieSchema = new Schema({
    id: {type: Number, default: 0},
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    products: {type: Array, required: false},
    active: {type: Boolean, required: true},
    promotion: {type: Number, required: false}
})

module.exports = mongoose.model('Categorie', CategorieSchema)