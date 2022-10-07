const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    priceIn: {
        type: Number
    },
    priceOut: {
        type: Number
    },
    priceSale: {
        type: Number
    },
    quantity: {
        type: Number
    },
    images: {
        type: Array
    },
    colours: {
        type: Array
    },
    description: {
        type: String
    },
    categoryId: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: String 
    },
    updatedAt: {
        type: String 
    },
    deletedAt: {
        type: String 
    },
})
module.exports = mongoose.model('products', ProductSchema)