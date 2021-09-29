const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    active: {type: String, default: 'no-image'},
    description: {type: String, required: true},
    image: {type: String, default: 'no-image'},
    name: {type: String, required: true},
    stok: {type: Number, default: 0},
    price: {type: Number, default: 0},
})

module.exports = mongoose.model('Product', ProductSchema)