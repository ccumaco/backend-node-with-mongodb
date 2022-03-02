const mongoose = require('mongoose')
const { Schema} = mongoose

const CommerceSchema = new Schema({
    active: {type: Boolean, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    name: {type: String, required: true},
    categories: {type: Array, required: false},
    promotion: {type: Number, required: false}
})

module.exports = mongoose.model('Commerce', CommerceSchema)