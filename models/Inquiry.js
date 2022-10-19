const mongoose = require('mongoose');
const Schema = mongoose.Schema

const InquirySchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    content: {
        type: String
    },
    isRead: {
        type: Boolean
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
module.exports = mongoose.model('inquiries', InquirySchema)