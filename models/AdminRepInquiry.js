const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AdminRepInquirySchema = new Schema({
    userInquiryId: {
        type: String
    },
    content: {
        type: String
    },
    adminId: {
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
module.exports = mongoose.model('adminRepInquiry', AdminRepInquirySchema)