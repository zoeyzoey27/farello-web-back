const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    orderId: {
        type: String
    },
    receiverName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    userId: {
        type: String
    },
    status: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    userNote: {
        type: String
    },
    transferFee: {
        type: Number
    },
    totalPaymentWithoutShipment: {
        type: Number
    },
    totalPayment: {
        type: Number
    },
    productsId: {
        type: Array
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
module.exports = mongoose.model('order', OrderSchema)