const { gql } = require('apollo-server-express')
const typeDefs = gql `
  enum Sort {
    asc
    desc
  }
  type Admin {
    id: ID!,
    adminId: String!,
    fullName: String!,
    email: String!,
    password: String!,
    token: String,
    phoneNumber: String!,
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
    idCard: String!,
    birthday: String,
    status: String!,
    createdAt: String!
    updatedAt: String,
  }
  input LoginInput {
    email: String!,
    password: String! 
  }
  type Product {
    id: ID!,
    name: String!,
    priceOrigin: Int!,
    priceSale: Int!,
    quantity: Int!,
    imageMain: String!,
    images: [String],
    description: String,
    category: Category!
  }
  type Category {
    id: ID!,
    name: String!,
    imageURL: String!,
    description: String,
    products: [Product]
  }
  type BannerImage {
    id: ID!,
    urlImage: String!
  }
  type Query {
    admins(adminInput: AdminInput, skip: Int, take: Int, orderBy: AdminOrderByInput): [Admin]
    admin(id: ID!): Admin
    products: [Product]
    product(id: ID!): Product
    categories(skip: Int, take: Int): [Category]
    category(id: ID!): Category
    bannerImages: [BannerImage]
    bannerImage(id: ID!): BannerImage
  }
  type Mutation {
    registerAdmin(adminRegisterInput: AdminRegisterInput): Admin
    loginAdmin(loginInput: LoginInput): Admin
    createCategory(name: String!, description: String): Category
    createProduct(
        name: String!, 
        priceOrigin: Int!,
        priceSale: Int!,
        quantity: Int!,
        imageMain: String!,
        images: [String],
        description: String, 
        categoryId: ID!
    ): Product
    createBannerImage(urlImage: String!): BannerImage
  }
`
module.exports = typeDefs