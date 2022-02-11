const mongoose = require('mongoose')
const { Schema} = mongoose

const CategorieSchema = new Schema({
    active: {type: Boolean, required: true},
    description: {type: String, required: true},
    id: {type: Number, default: 0},
    image: {type: String, required: true},
    name: {type: String, required: true},
    products: {type: Array, required: false},
    promotion: {type: Number, required: false}
})

module.exports = mongoose.model('Categorie', CategorieSchema)