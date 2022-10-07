const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    provinceCode: {
        type: String
    },
    districtCode: {
        type: String
    },
    communeCode: {
        type: String
    },
    idCard: {
        type: String
    },
    birthday: {
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
module.exports = mongoose.model('users', UserSchema)