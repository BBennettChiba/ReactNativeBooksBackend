import { Any } from "typeorm";
import { Book } from "./entity/Book";
import { User } from "./entity/User";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;
      const user = await User.findOne({
        where: { id: id },
        relations: ["ownedBooks", "booksToRead"],
      });
      return user;
    },
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const { name, id } = args.input;
      try {
        let user = new User();
        user.name = name;
        user.id = id;

        user = await User.save(user);
        user.ownedBooks = [];
        user.booksToRead = [];
        return user;
      } catch (error) {
        return false;
      }
    },
    createOwnedBook: async (_: any, { input }: any) => {
      const userID = input.userID;
      try {
        let user = await User.findOne(
          { id: userID },
          { relations: ["ownedBooks", "booksToRead"] }
        );
        delete input.userID;
        let book = new Book();
        book = Object.assign(book, input);
        user.ownedBooks.push(book);
        user = await User.save(user);
        return book;
      } catch (e) {
        return "Yo something went wrong";
      }
    },
    createBookToRead: async (_: any, { input }: any) => {
      try {
        const user = await User.findOne(
          { id: input.userID },
          { relations: ["ownedBooks", "booksToRead"] }
        );
        delete input.userID;
        let book = new Book();
        book = Object.assign(book, input);
        user.booksToRead.push(book);
        try {
          let db = await User.save(user);
        } catch (e) {
          console.log(e);
        }
        return book;
      } catch (e) {
        return "Yo something went wrong";
      }
    },
    deleteOwnedBook: async (_: any, { input }: any) => {
      try {
        const user = await User.findOne(
          { id: input.userID },
          { relations: ["ownedBooks", "booksToRead"] }
        );
        user.ownedBooks = user.ownedBooks.filter((a) => a.id !== input.id);
        try {
          let db = await User.save(user);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
      return "Deleted !";
    },
    deleteBookToRead: async (_: any, { input }: any) => {
      try {
        const user = await User.findOne(
          { id: input.userID },
          { relations: ["ownedBooks", "booksToRead"] }
        );
        user.booksToRead = user.booksToRead.filter((a) => a.id !== input.id);
        try {
          let db = await User.save(user);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        return "Yo something went wrong";
      }
      return "Deleted";
    },
  },
};
