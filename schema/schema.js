const { gql } = require('apollo-server-express')
const typeDefs = gql `
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
    products: [Product]
    product(id: ID!): Product
    categories(skip: Int, take: Int): [Category]
    category(id: ID!): Category
    bannerImages: [BannerImage]
    bannerImage(id: ID!): BannerImage
  }
  type Mutation {
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