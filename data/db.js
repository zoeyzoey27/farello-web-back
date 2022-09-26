const BannerImage = require('../models/BannerImage')
const Category = require('../models/Category')
const Product = require('../models/Product')

const mongoDataMethods = {
    getAllProducts: async (condition = null) => 
      condition===null ? await Product.find() : await Product.find(condition),
    getProductById: async id => await Product.findById(id),
    getAllCategories: async (skip, take) => await Category.find().limit(take).skip(skip),
    getCategoryById: async id => await Category.findById(id),
    getAllBannerImages: async () => await BannerImage.find(),
    getBannerImageById: async id => await BannerImage.findById(id),
    createCategory: async args => {
        const newCategory = new Category(args)
        return await newCategory.save()
    },
    createProduct: async args => {
        const newProduct = new Product(args)
        return await newProduct.save()
    },
    createBannerImage: async args => {
        const newBannerImage = new BannerImage(args)
        return await newBannerImage.save()
    }

}
module.exports = mongoDataMethods