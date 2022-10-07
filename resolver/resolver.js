const resolvers = {
    Query: {
        users: async (_parent, {userInput, skip, take, orderBy}, {mongoDataMethods}) => 
           await mongoDataMethods.getUsers(userInput, skip, take, orderBy),
        user: async (_parent, {id}, {mongoDataMethods}) =>
           await mongoDataMethods.getUserById(id),
        admins: async (_parent, {adminInput, skip, take, orderBy}, {mongoDataMethods}) => 
           await mongoDataMethods.getAdmins(adminInput, skip, take, orderBy),
        admin: async (_parent, {id}, {mongoDataMethods}) =>
           await mongoDataMethods.getAdminById(id),
        products: async (_parent, {productSearchInput, skip, take, orderBy}, {mongoDataMethods}) => 
           await mongoDataMethods.getAllProducts(productSearchInput, skip, take, orderBy),
        product: async (_parent, {id}, {mongoDataMethods}) => 
           await mongoDataMethods.getProductById(id),
        categories: async (_parent, {categorySearchInput, skip, take, orderBy}, {mongoDataMethods}) => 
           await mongoDataMethods.getAllCategories(categorySearchInput, skip, take, orderBy),
        category: async (_parent, {id}, {mongoDataMethods}) => 
           await mongoDataMethods.getCategoryById(id),
        bannerImages: async (_parent, _args, {mongoDataMethods}) =>
           await mongoDataMethods.getAllBannerImages(),
        bannerImage: async (_parent, {id}, {mongoDataMethods}) =>
           await mongoDataMethods.getBannerImagesById(id),
        getProductsAddedToCart: async (_parent, {userId}, {mongoDataMethods}) =>
           await mongoDataMethods.getProductsAddedToCart(userId),
    },
    Product: {
        category: async ({categoryId}, _args, {mongoDataMethods}) => {
         return await mongoDataMethods.getCategoryById(categoryId)
        }
    },
    Category: {
        products: async ({id}, _args, {mongoDataMethods}) => {
         return await mongoDataMethods.getAllProductsByCategory(id)
        }
    },
    ProductsAddedToCart: {
       addedBy: async ({userId}, _args, {mongoDataMethods}) => {
         return await mongoDataMethods.getUserById(userId)
       }
    },
    Mutation: {
        registerUser: async (_parent, {userRegisterInput}, {mongoDataMethods}) => await mongoDataMethods.registerUser(userRegisterInput),
        loginUser: async (_parent, {loginInput}, {mongoDataMethods}) => await mongoDataMethods.loginUser(loginInput),
        updateUserInfo: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.updateUserInfo(args),
        deleteUserAccount: async (_parent, {id}, {mongoDataMethods}) => await mongoDataMethods.deleteUserAccount(id),
        registerAdmin: async (_parent, {adminRegisterInput}, {mongoDataMethods}) => await mongoDataMethods.registerAdmin(adminRegisterInput),
        updateAdmin: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.updateAdmin(args),
        deleteAdminAccount: async (_parent, {id}, {mongoDataMethods}) => await mongoDataMethods.deleteAdminAccount(id),
        loginAdmin: async (_parent, {loginInput}, {mongoDataMethods}) => await mongoDataMethods.loginAdmin(loginInput),
        createCategory: async (_parent, {categoryInput}, {mongoDataMethods}) => await mongoDataMethods.createCategory(categoryInput),
        updateCategory: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.updateCategory(args),
        deleteCategory: async (_parent, {id}, {mongoDataMethods}) => await mongoDataMethods.deleteCategory(id),
        createProduct: async (_parent, {productInput}, {mongoDataMethods}) => await mongoDataMethods.createProduct(productInput),
        updateProduct: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.updateProduct(args),
        deleteProduct: async (_parent, {id}, {mongoDataMethods}) => await mongoDataMethods.deleteProduct(id),
        createBannerImage: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.createBannerImage(args),
        addProductToCart: async (_parent, {productsAddedToCartInput}, {mongoDataMethods}) => await mongoDataMethods.addProductToCart(productsAddedToCartInput),
        updateCart: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.updateCart(args),
    }
}
module.exports = resolvers