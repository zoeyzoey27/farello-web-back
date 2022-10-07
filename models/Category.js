const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryId: {
        type: String
    },
    name: {
        type: String
    },
    imageKey: {
        type: String
    },
    description: {
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
module.exports = mongoose.model('categories', CategorySchema)