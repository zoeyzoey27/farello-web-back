const { gql } = require('apollo-server-express')
const typeDefs = gql `
  enum Sort {
    asc
    desc
  }
  enum Stock {
    STOCKING
    OUT_OF_STOCK
  }
  enum CancelBy {
    USER
    ADMIN
  }
  type User {
    id: ID!,
    userId: String!,
    fullName: String!,
    email: String!,
    password: String!,
    token: String,
    phoneNumber: String!,
    provinceCode: String!,
    districtCode: String!,
    communeCode: String!,
    address: String!,
    idCard: String,
    birthday: String,
    status: String!,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String
  }
  input UserRegisterInput {
    userId: String!,
    fullName: String!,
    email: String!,
    password: String!,
    phoneNumber: String!,
    address: String!, 
    provinceCode: String!,
    districtCode: String!,
    communeCode: String!,
    idCard: String,
    birthday: String,
    status: String!,
    createdAt: String!
    updatedAt: String,
  }
  input UserInput {
    userId: String,
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String,
  }
  input UserOrderByInput {
    createdAt: Sort,
    updatedAt: Sort
  }
  input UserUpdateInput {
    fullName: String!,
    email: String!,
    phoneNumber: String!,
    address: String!, 
    provinceCode: String!,
    districtCode: String!,
    communeCode: String!,
    idCard: String,
    birthday: String,
    status: String!,
    updatedAt: String,
  }
  type Admin {
    id: ID!,
    adminId: String!,
    fullName: String!,
    email: String!,
    password: String!,
    token: String,
    phoneNumber: String!,
    provinceCode: String!,
    districtCode: String!,
    communeCode: String!,
    address: String!,
    idCard: String!,
    birthday: String,
    status: String!,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String
  }
  input AdminInput {
    adminId: String,
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String,
    idCard: String,
  }
  input AdminOrderByInput {
    createdAt: Sort,
    updatedAt: Sort
  }
  input AdminRegisterInput {
    adminId: String!,
    fullName: String!,
    email: String!,
    password: String!,
    phoneNumber: String!,
    address: String!, 
    provinceCode: String!,
    districtCode: String!,
    communeCode: String!,
    idCard: String!,
    birthday: String,
    status: String!,
    createdAt: String!
    updatedAt: String,
  }
  input AdminUpdateInput {
    fullName: String!,
    email: String!,
    phoneNumber: String!,
    address: String!, 
    provinceCode: String!,
    districtCode: String!,
    communeCode: String!,
    idCard: String!,
    birthday: String,
    status: String!,
    updatedAt: String,
  }
  input LoginInput {
    email: String!,
    password: String! 
  }
  type Product {
    id: ID!,
    productId: String!,
    name: String!,
    priceIn: Int,
    priceOut: Int!,
    priceSale: Int,
    quantity: Int!,
    colours: [String],
    images: [String]!,
    description: String,
    category: Category,
    status: Stock,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String,
  }
  input ProductInput {
    productId: String!,
    name: String!,
    priceIn: Int,
    priceOut: Int!,
    priceSale: Int,
    quantity: Int!,
    colours: [String],
    images: [String]!,
    description: String,
    categoryId: ID!,
    status: Stock,
    createdAt: String!,
    updatedAt: String,
  }
  input ProductSearchInput {
    productId: String,
    name: String,
    priceIn: Int,
    priceOut: Int,
    priceSale: Int,
    quantity: Int,
    categoryId: ID,
    status: Stock,
  }
  input ProductUpdateInput {
    name: String!,
    priceIn: Int,
    priceOut: Int!,
    priceSale: Int,
    quantity: Int!,
    colours: [String],
    images: [String]!,
    description: String,
    categoryId: ID!,
    updatedAt: String,
    status: Stock,
  }
  input ProductOrderByInput {
    priceIn: Sort,
    priceOut: Sort,
    priceSale: Int,
    quantity: Sort,
    createdAt: Sort,
    updatedAt: Sort
  }
  type Category {
    id: ID!,
    categoryId: String!,
    name: String!,
    imageKey: String!,
    description: String,
    products: [Product],
    createdAt: String!,
    updatedAt: String,
    deletedAt: String
  }
  input CategoryInput {
    categoryId: String!,
    name: String!,
    imageKey: String!,
    description: String,
    createdAt: String!,
    updatedAt: String,
  }
  input CategoryUpdateInput {
    name: String!,
    description: String,
    imageKey: String!,
    updatedAt: String,
  }
  input CategorySearchInput {
    categoryId: String,
    name: String,
  }
  input CategoryOrderByInput {
    createdAt: Sort,
    updatedAt: Sort
  }
  type BannerImage {
    id: ID!,
    urlImage: String!
  }
  type ProductsAddedToCart {
    id: ID!,
    productId: String!,
    name: String!,
    color: String!,
    quantity: Int!,
    price: Int!,
    imageKey: String!,
    addedBy: User!,
    totalPayment: Int!,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String,
  }
  input ProductsAddedToCartInput {
    productId: String!,
    name: String!,
    color: String!,
    quantity: Int!,
    price: Int!,
    imageKey: String!,
    userId: ID!,
    totalPayment: Int!,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String,
  }
  type ProductsOrdered {
    id: ID!,
    productId: String!,
    name: String!,
    color: String!,
    quantity: Int!,
    price: Int!,
    imageKey: String!,
    totalPayment: Int!,
    userId: String!,
    orderId: String!,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String,
  }
  type Order {
    id: ID!,
    orderId: String!,
    receiverName: String!,
    address: String!,
    email: String!,
    phoneNumber: String!,
    createdBy: User!,
    status: String!,
    paymentMethod: String!,
    userNote: String,
    transferFee: Int!,
    totalPaymentWithoutShipment: Int!,
    totalPayment: Int!,
    products: [ProductsOrdered],
    cancelReason: String,
    cancelBy: CancelBy,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String,
  }
  input OrderInput {
    orderId: String!,
    receiverName: String!,
    address: String!,
    email: String!,
    phoneNumber: String!,
    userId: String!,
    status: String!,
    paymentMethod: String!,
    userNote: String,
    transferFee: Int!,
    totalPaymentWithoutShipment: Int!,
    totalPayment: Int!,
    productsId: [String],
    cancelReason: String,
    createdAt: String!,
    updatedAt: String,
  }
  input OrderSearchInput {
    orderId: String,
    receiverName: String,
    address: String,
    email: String,
    phoneNumber: String,
    status: String,
    userId: String,
  }
  input OrderSortInput {
    createdAt: String,
    updatedAt: String,
  }
  input OrderUpdateInput {
    status: String!,
    cancelReason: String,
    cancelBy: CancelBy,
    updatedAt: String,
  }
  type Post {
    id: ID!,
    postId: String!,
    title: String!,
    category: PostCategory!,
    content: String!,
    imageKey: String!,
    createdBy: Admin,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String
  }
  input PostInput {
    postId: String!,
    title: String!,
    categoryId: ID!,
    content: String!,
    imageKey: String!,
    adminId: ID!,
    createdAt: String!,
    updatedAt: String,
    deletedAt: String
  }
  input PostUpdateInput {
    title: String!,
    categoryId: ID!,
    content: String!,
    imageKey: String!,
    updatedAt: String,
  }
  input PostSearchInput {
    postId: String,
    title: String,
    categoryId: ID,
    adminId: ID,
  }
  input PostSortInput {
    createdAt: String,
    updatedAt: String,
  }
  type PostCategory {
    id: ID!,
    categoryId: String!,
    title: String!,
    posts: [Post],
    createdAt: String!,
    updatedAt: String,
    deletedAt: String
  }
  input PostCategoryInput {
    categoryId: String!,
    title: String!,
    createdAt: String!,
    updatedAt: String,
  }
  input PostCategoryUpdateInput {
    title: String!,
    updatedAt: String,
  }
  input PostCategorySortInput {
    createdAt: String,
    updatedAt: String,
  }
  type Query {
    users(userInput: UserInput, skip: Int, take: Int, orderBy: UserOrderByInput): [User]
    user(id: ID!): User
    admins(adminInput: AdminInput, skip: Int, take: Int, orderBy: AdminOrderByInput): [Admin]
    admin(id: ID!): Admin
    products(productSearchInput: ProductSearchInput, skip: Int, take: Int, orderBy: ProductOrderByInput): [Product]
    product(id: ID!): Product
    categories(categorySearchInput: CategorySearchInput, skip: Int, take: Int, orderBy: CategoryOrderByInput): [Category]
    category(id: ID!): Category
    bannerImages: [BannerImage]
    bannerImage(id: ID!): BannerImage
    getProductsAddedToCart(userId: ID!): [ProductsAddedToCart]
    orders(orderSearchInput: OrderSearchInput, skip: Int, take: Int, orderBy: OrderSortInput): [Order]
    order(id: ID!): Order
    postCategories(skip: Int, take: Int, orderBy: PostCategorySortInput): [PostCategory]
    postCategory(id: ID!): PostCategory
    posts(postSearchInput: PostSearchInput, skip: Int, take: Int, orderBy: PostSortInput): [Post]
    post(id: ID!): Post
  }
  type Mutation {
    registerUser(userRegisterInput: UserRegisterInput): User
    loginUser(loginInput: LoginInput): User
    updateUserInfo(id: ID!, userUpdateInput: UserUpdateInput): User
    deleteUserAccount(id: ID!): Boolean
    registerAdmin(adminRegisterInput: AdminRegisterInput): Admin
    updateAdmin(id: ID!, adminUpdateInput: AdminUpdateInput): Admin
    deleteAdminAccount(id: ID!): Boolean
    loginAdmin(loginInput: LoginInput): Admin
    createCategory(categoryInput: CategoryInput): Category
    updateCategory(id: ID!, categoryUpdateInput: CategoryUpdateInput): Category
    deleteCategory(id: ID!): Boolean
    createProduct(productInput: ProductInput): Product
    updateProduct(id: ID!, productUpdateInput: ProductUpdateInput): Product
    deleteProduct(id: ID!): Boolean
    createBannerImage(urlImage: String!): BannerImage
    addProductToCart(productsAddedToCartInput: ProductsAddedToCartInput!): ProductsAddedToCart
    updateCart(id: ID!, quantity: Int!, totalPayment: Int!, updatedAt: String): ProductsAddedToCart
    deleteProductFromCart(id: ID!): Boolean
    createOrder(orderInput: OrderInput!): Order
    updateOrderStatus(id: ID!, orderUpdateInput: OrderUpdateInput!): Order
    createPostCategory(postCategoryInput: PostCategoryInput!): PostCategory
    createPost(postInput: PostInput!): Post
    updatePost(id: ID!, postUpdateInput: PostUpdateInput!): Post
    deletePost(id: ID!): Boolean
    updatePostCategory(id: ID!, postCategoryUpdateInput: PostCategoryUpdateInput!): PostCategory
    deletePostCategory(id: ID!): Boolean
  }
`
module.exports = typeDefs