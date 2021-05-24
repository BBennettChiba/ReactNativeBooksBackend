// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
  }
  type Mutation {
    createUser(input: createUserInput!): User!
    createOwnedBook(input: createOwnedBookInput!): Book
  }
  type User {
    id: Int!
    name: String!
    ownedBooks: [Book]
    booksToRead: [Book]
  }
  type Book {
    title: String
    isbn: String
    coverURL: String
    language: String
    pageCount: Int
    publisher: String
    publishedDate: String
    description: String
    categories: [String]
    authors: [String]
    createdAt: String
    updatedAt: String
  }
  input createOwnedBookInput{
    title: String
    userID: String
    isbn: String
    coverURL: String
    language: String
    pageCount: Int
    publisher: String
    publishedDate: String
    description: String
    categories: [String]
    authors: [String]
  }
  input createUserInput{
    name: String!
  }
`;
