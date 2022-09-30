const resolvers = {
    Query: {
        admins: async (_parent, {adminInput, skip, take, orderBy}, {mongoDataMethods}) => 
           await mongoDataMethods.getAdmins(adminInput, skip, take, orderBy),
        admin: async (_parent, {id}, {mongoDataMethods}) =>
           await mongoDataMethods.getAdminById(id),
        products: async (_parent, _args, {mongoDataMethods}) => 
           await mongoDataMethods.getAllProducts(),
        product: async (_parent, {id}, {mongoDataMethods}) => 
           await mongoDataMethods.getProductById(id),
        categories: async (_parent, {skip, take}, {mongoDataMethods}) => 
           await mongoDataMethods.getAllCategories(skip,take),
        category: async (_parent, {id}, {mongoDataMethods}) => 
           await mongoDataMethods.getCategoryById(id),
        bannerImages: async (_parent, _args, {mongoDataMethods}) =>
           await mongoDataMethods.getAllBannerImages(),
        bannerImage: async (_parent, {id}, {mongoDataMethods}) =>
           await mongoDataMethods.getBannerImagesById(id)
    },
    Product: {
        category: async ({categoryId}, _args, {mongoDataMethods}) => 
           await mongoDataMethods.getCategoryById(categoryId)
    },
    Category: {
        products: async ({id}, _args, {mongoDataMethods}) => 
           await mongoDataMethods.getAllProducts({categoryId: id})
    },
    Mutation: {
        registerAdmin: async (_parent, {adminRegisterInput}, {mongoDataMethods}) => await mongoDataMethods.registerAdmin(adminRegisterInput),
        loginAdmin: async (_parent, {loginInput}, {mongoDataMethods}) => await mongoDataMethods.loginAdmin(loginInput),
        createCategory: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.createCategory(args),
        createProduct: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.createProduct(args),
        createBannerImage: async (_parent, args, {mongoDataMethods}) => await mongoDataMethods.createBannerImage(args)
    }
}
module.exports = resolvers