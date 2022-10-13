const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    postId: {
        type: String
    },
    categoryId: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    imageKey: {
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
module.exports = mongoose.model('posts', PostSchema)