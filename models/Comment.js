const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String
    },
    ratePoint: {
        type: Number
    },
    rateDescription: {
        type: String
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    userLiked: {
       type: Array
    },
    userDisLiked: {
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
module.exports = mongoose.model('comments', CommentSchema)