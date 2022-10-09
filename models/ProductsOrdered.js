const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductsOrderedSchema = new Schema({
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    name: {
        type: String
    },
    color: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    imageKey: {
        type: String
    },
    totalPayment: {
        type: Number
    },
    orderId: {
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
module.exports = mongoose.model('productsOrdered', ProductsOrderedSchema)