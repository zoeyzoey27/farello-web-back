const BannerImage = require('../models/BannerImage')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Admin = require('../models/Admin')
const { ApolloError } = require('apollo-server-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mongoDataMethods = {
    getAdminById: async id => await Admin.findById(id),
    getAdmins: async (adminInput, skip, take, orderBy) => {
      const { fullName, email, phoneNumber, address, idCard, adminId } = adminInput
      return Admin.find({
        adminId: {$regex : adminId || '', '$options' : 'i'},
        fullName: {$regex : fullName || '', '$options' : 'i'},
        email: {$regex : email || '', '$options' : 'i'},
        phoneNumber: {$regex : phoneNumber || '', '$options' : 'i'},
        address: {$regex : address || '', '$options' : 'i'},
        idCard: {$regex : idCard || '', '$options' : 'i'},
      }).limit(take).skip(skip).sort({createdAt: orderBy.createdAt, updatedAt: orderBy.updatedAt})
    },
    getAllProducts: async (condition = null) => 
      condition===null ? await Product.find() : await Product.find(condition),
    getProductById: async id => await Product.findById(id),
    getAllCategories: async (skip, take) => await Category.find().limit(take).skip(skip),
    getCategoryById: async id => await Category.findById(id),
    getAllBannerImages: async () => await BannerImage.find(),
    getBannerImageById: async id => await BannerImage.findById(id),
    registerAdmin: async adminRegisterInput => {
       const { fullName, email, password, phoneNumber, address, idCard, birthday, status, createdAt, adminId } = adminRegisterInput
       const oldAdmin = await Admin.findOne({email})
       if (oldAdmin) {
         throw new ApolloError('Một tài khoản đã được đăng ký với email: ' + email, 'ADMIN_ALREADY_EXISTS')
       }
       const encryptedPassword = await bcrypt.hash(password, 10)
       const newAdmin = new Admin({
         adminId: adminId,
         fullName: fullName,
         email: email,
         password: encryptedPassword,
         phoneNumber: phoneNumber,
         address: address,
         idCard: idCard,
         birthday: birthday,
         status: status,
         createdAt: createdAt,
      })
      const token = jwt.sign(
         { admin_id: newAdmin._id, email },
         "UNSAFESTRING",
         {
           expiresIn: "2h",
         }
      )
      newAdmin.token = token
      const res = await newAdmin.save()
      return {
        id: res.id,
        ...res._doc
      }
    },
    loginAdmin: async loginInput => {
        const { email, password } = loginInput
        const admin = await Admin.findOne({ email })
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign(
                { admin_id: admin._id, email },
                "UNSAFESTRING",
                {
                  expiresIn: "2h",
                }
            )
            admin.token = token
            return {
                id: admin.id,
                ...admin._doc
            }
        }
        else {
            throw new ApolloError('Mật khẩu đăng nhập không chính xác', 'INCORRECT_PASSWORD')
        }
    },
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