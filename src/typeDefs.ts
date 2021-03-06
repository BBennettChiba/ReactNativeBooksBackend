// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
  }
  type Mutation {
    createUser(input: createUserInput!): User!
    createOwnedBook(input: createOwnedBookInput!): Book
    createBookToRead(input: createBookToReadInput!): Book
    deleteBookToRead(input: deleteBookToReadInput!): String
    deleteOwnedBook(input: deleteOwnedBookInput!): String
  }
  type User {
    id: String!
    name: String!
    ownedBooks: [Book]
    booksToRead: [Book]
    createdAt: String
    updatedAt: String
  }
  type Book {
    id: String
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
  input createBookToReadInput{
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
    id: String!
    name: String!
  }
  input deleteBookToReadInput{
    id: String!
    userID: String!
  }
  input deleteOwnedBookInput{
    id: String!
    userID: String!
  }
`;
