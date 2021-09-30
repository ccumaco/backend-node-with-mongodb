const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    active: {type: Boolean, default: false},
    description: {type: String, required: true},
    image: {type: String, default: 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'},
    name: {type: String, required: true},
    stok: {type: Number, default: 0},
    price: {type: Number, default: 0},
})

module.exports = mongoose.model('Product', ProductSchema)