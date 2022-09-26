const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
    },
    priceOrigin: {
        type: Number
    },
    priceSale: {
        type: Number
    },
    quantity: {
        type: Number
    },
    imageMain: {
        type: String
    },
    images: {
        type: Array
    },
    description: {
        type: String
    },
    categoryId: {
        type: String
    }
})
module.exports = mongoose.model('products', ProductSchema)