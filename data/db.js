const BannerImage = require('../models/BannerImage')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Admin = require('../models/Admin')
const User = require('../models/User')
const ProductsAddedToCart = require('../models/ProductsAddedToCart')
const ProductsOrdered = require('../models/ProductsOrdered')
const Order = require('../models/Order')
const { ApolloError } = require('apollo-server-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mongoDataMethods = {
    getUserById: async id => await User.findById(id),
    getUsers: async (userInput, skip, take, orderBy) => {
      const { fullName, email, phoneNumber, address, idCard, userId } = userInput
      return User.find({
        userId: {$regex : userId || '', '$options' : 'i'},
        fullName: {$regex : fullName || '', '$options' : 'i'},
        email: {$regex : email || '', '$options' : 'i'},
        phoneNumber: {$regex : phoneNumber || '', '$options' : 'i'},
        address: {$regex : address || '', '$options' : 'i'},
        idCard: {$regex : idCard || '', '$options' : 'i'},
      }).limit(take).skip(skip).sort({createdAt: orderBy.createdAt, updatedAt: orderBy.updatedAt})
    },
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
    getAllProductsByCategory: async (categoryId) => {
      return Product.find({
        categoryId: {$regex : categoryId || '', '$options' : 'i'},
      })
    },
    getAllProducts: async (productSearchInput, skip, take, orderBy) => {
      const { productId, name, priceIn, priceOut, priceSale, quantity, categoryId, status } = productSearchInput
      return Product.find({
        productId: {$regex : productId || '', '$options' : 'i'},
        name: {$regex : name || '', '$options' : 'i'},
        priceIn: priceIn || undefined,
        priceOut: priceOut || undefined,
        priceSale: priceSale || undefined,
        quantity: quantity || undefined,
        categoryId: {$regex : categoryId || '', '$options' : 'i'},
        status: status || undefined,
      }).limit(take).skip(skip).sort({createdAt: orderBy.createdAt, updatedAt: orderBy.updatedAt})
    },
    getProductById: async id => await Product.findById(id),
    getAllCategories: async (categorySearchInput, skip, take, orderBy) => {
      const { categoryId, name } = categorySearchInput
      return Category.find({
        categoryId: {$regex : categoryId || '', '$options' : 'i'},
        name: {$regex : name || '', '$options' : 'i'},
      }).limit(take).skip(skip).sort({createdAt: orderBy.createdAt, updatedAt: orderBy.updatedAt})
    },
    getCategoryById: async id => await Category.findById(id),
    getAllBannerImages: async () => await BannerImage.find(),
    getBannerImageById: async id => await BannerImage.findById(id),
    getProductsAddedToCart: async (userId) => await ProductsAddedToCart.find({userId}),
    updateCart: async args => {
      const { id, quantity, totalPayment, updatedAt } = args
      return await ProductsAddedToCart.findByIdAndUpdate(id, {quantity, totalPayment, updatedAt}, {new: true})
    },
    getProductsOrdered: async id => await ProductsOrdered.find({orderId: id}),
    registerAdmin: async adminRegisterInput => {
       const { 
         fullName, 
         email, 
         password, 
         phoneNumber, 
         address, 
         provinceCode,
         districtCode,
         communeCode,
         idCard, 
         birthday, 
         status, 
         createdAt, 
         adminId, 
         updatedAt 
        } = adminRegisterInput
       const oldAdmin = await Admin.findOne({email})
       if (oldAdmin) {
        throw new ApolloError('Email đăng ký đã tồn tại', 'ADMIN_ALREADY_EXISTS')
       }
       const encryptedPassword = await bcrypt.hash(password, 10)
       const newAdmin = new Admin({
         adminId: adminId,
         fullName: fullName,
         email: email,
         password: encryptedPassword,
         phoneNumber: phoneNumber,
         address: address,
         provinceCode: provinceCode,
         districtCode: districtCode,
         communeCode: communeCode,
         idCard: idCard,
         birthday: birthday,
         status: status,
         createdAt: createdAt,
         updatedAt: updatedAt,
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
    registerUser: async userRegisterInput => {
      const { 
        fullName, 
        email, 
        password, 
        phoneNumber, 
        address, 
        provinceCode,
        districtCode,
        communeCode,
        idCard, 
        birthday, 
        status, 
        createdAt, 
        userId, 
        updatedAt 
       } = userRegisterInput
      const oldUser = await User.findOne({email})
      if (oldUser) {
        throw new ApolloError('Email đăng ký đã tồn tại', 'USER_ALREADY_EXISTS')
      }
      const encryptedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        userId: userId,
        fullName: fullName,
        email: email,
        password: encryptedPassword,
        phoneNumber: phoneNumber,
        address: address,
        provinceCode: provinceCode,
        districtCode: districtCode,
        communeCode: communeCode,
        idCard: idCard,
        birthday: birthday,
        status: status,
        createdAt: createdAt,
        updatedAt: updatedAt,
     })
     const token = jwt.sign(
        { user_id: newUser._id, email },
        "UNSAFESTRING",
        {
          expiresIn: "2h",
        }
     )
     newUser.token = token
     const res = await newUser.save()
     return {
       id: res.id,
       ...res._doc
     }
    },
    loginUser: async loginInput => {
        const { email, password } = loginInput
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                "UNSAFESTRING",
                {
                  expiresIn: "2h",
                }
            )
            user.token = token
            return {
                id: user.id,
                ...user._doc
            }
        }
        else {
            throw new ApolloError('Tài khoản đăng nhập không chính xác', 'INCORRECT_ACCOUNT')
        }
    },
    updateUserInfo: async args => {
      const { id, userUpdateInput } = args
      return await User.findByIdAndUpdate(id, userUpdateInput, {new: true})
    },
    deleteUserAccount: async id => {
      await User.findByIdAndDelete(id)
      return true
    },
    updateAdmin: async args => {
      const { id, adminUpdateInput } = args
      return await Admin.findByIdAndUpdate(id, adminUpdateInput, {new: true})
    },
    deleteAdminAccount: async id => {
      await Admin.findByIdAndDelete(id)
      return true
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
            throw new ApolloError('Tài khoản đăng nhập không chính xác', 'INCORRECT_ACCOUNT')
        }
    },
    createCategory: async categoryInput => {
        const { categoryId, name, description, imageKey, createdAt, updatedAt } = categoryInput
        const newCategory = new Category({
          categoryId: categoryId,
          name: name, 
          description: description,
          imageKey: imageKey,
          createdAt: createdAt,
          updatedAt: updatedAt,
        })
        return await newCategory.save()
    },
    updateCategory: async args => {
        const { id, categoryUpdateInput } = args
        return await Category.findByIdAndUpdate(id, categoryUpdateInput, {new: true})
    },
    deleteCategory: async id => {
      await Category.findByIdAndDelete(id)
      return true
    },
    createProduct: async productsInput => {
        const newProduct = new Product({
          productId: productsInput.productId,
          name: productsInput.name,
          priceIn: productsInput.priceIn,
          priceOut: productsInput.priceOut,
          priceSale: productsInput.priceSale,
          description: productsInput.description,
          quantity: productsInput.quantity,
          images: productsInput.images,
          colours: productsInput.colours,
          categoryId: productsInput.categoryId,
          createdAt: productsInput.createdAt,
          updatedAt: productsInput.updatedAt,
          status: productsInput.status
        })
        return await newProduct.save()
    },
    updateProduct: async args => {
      const { id, productUpdateInput } = args
      return await Product.findByIdAndUpdate(id, productUpdateInput, {new: true})
    },
    deleteProduct: async id => {
      await Product.findByIdAndDelete(id)
      return true
    },
    createBannerImage: async args => {
        const newBannerImage = new BannerImage(args)
        return await newBannerImage.save()
    },
    addProductToCart: async productsAddedToCartInput => {
       const productId = productsAddedToCartInput.productId
       const color = productsAddedToCartInput.color
       const oldProduct = await ProductsAddedToCart.findOne({ productId, color })
       if (oldProduct) {
        const id = oldProduct._id
        const quantityProduct = oldProduct.quantity + productsAddedToCartInput.quantity
        const totalPaymentProduct = oldProduct.totalPayment + productsAddedToCartInput.totalPayment
        return await ProductsAddedToCart.findByIdAndUpdate(id, {
            quantity: quantityProduct,
            totalPayment: totalPaymentProduct,
            updatedAt: productsAddedToCartInput.updatedAt,
        }, {new: true})
       }
       else {
          const newProductAdded = new ProductsAddedToCart({
            productId: productsAddedToCartInput.productId,
            name: productsAddedToCartInput.name,
            color: productsAddedToCartInput.color,
            quantity: productsAddedToCartInput.quantity,
            price: productsAddedToCartInput.price,
            imageKey: productsAddedToCartInput.imageKey,
            userId: productsAddedToCartInput.userId,
            totalPayment: productsAddedToCartInput.totalPayment,
            createdAt: productsAddedToCartInput.createdAt,
            updatedAt: productsAddedToCartInput.updatedAt,
         })
         return await newProductAdded.save()
       }
    },
    deleteProductFromCart: async id => {
      await ProductsAddedToCart.findByIdAndDelete(id)
      return true
    },
    createOrder: async OrderInput => {
       const newOrder = new Order({
          orderId: OrderInput.orderId,
          receiverName: OrderInput.receiverName,
          address: OrderInput.address,
          email: OrderInput.email,
          phoneNumber: OrderInput.phoneNumber,
          userId: OrderInput.userId,
          userNote: OrderInput.userNote,
          status: OrderInput.status,
          paymentMethod: OrderInput.paymentMethod,
          transferFee: OrderInput.transferFee,
          totalPayment: OrderInput.totalPayment,
          totalPaymentWithoutShipment: OrderInput.totalPaymentWithoutShipment,
          createdAt: OrderInput.createdAt,
          updatedAt: OrderInput.updatedAt,
       })
       const productsAdded = await ProductsAddedToCart.find({userId: OrderInput.userId})
       const productsId = []
       if (productsAdded.length >0) {
          for (let i = 0; i<productsAdded.length; i++) {
            const newProductOrdered = new ProductsOrdered({
              productId: productsAdded[i].productId,
              name: productsAdded[i].name,
              color: productsAdded[i].color,
              quantity: productsAdded[i].quantity,
              price: productsAdded[i].price,
              totalPayment: productsAdded[i].totalPayment,
              imageKey: productsAdded[i].imageKey,
              userId: productsAdded[i].userId,
              orderId: newOrder._id.toString(),
              createdAt: OrderInput.createdAt,
              updatedAt: OrderInput.updatedAt,
            })
            await newProductOrdered.save()
            productsId.push(newProductOrdered._id.toString())
            }
       }
       newOrder.productsId = productsId
       return await newOrder.save()
    }

}
module.exports = mongoDataMethods