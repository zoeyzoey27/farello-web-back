const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BannerImageSchema = new Schema({
    urlImage: {
        type: String
    }
})
module.exports = mongoose.model('bannerImages', BannerImageSchema)