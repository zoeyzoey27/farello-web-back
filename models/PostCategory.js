const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostCategorySchema = new Schema({
    categoryId: {
        type: String
    },
    title: {
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
module.exports = mongoose.model('postCategories', PostCategorySchema)