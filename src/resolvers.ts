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
        let user = new User()
        user.name = name;
        user.id = id

        user = await User.save(user);
        return user;
      } catch (error) {
        return false;
      }
    },
    createOwnedBook: async (_: any, { input }: any) => {
      const userID = input.userID;
      try {
        const user = await User.findOne(
          { id: userID },
          { relations: ["ownedBooks", "booksToRead"] }
        );
        delete input.userID;
        let book = new Book();
        book = Object.assign(book, input);
        user.ownedBooks.push(book);
        User.save(user);
        return book;
      } catch (e) {
        return "Yo something went wrong";
      }
    },
    createBookToRead: async (_: any, { input }: any) => {
      const userID = input.userID;
      try {
        const user = await User.findOne(
          { id: userID },
          { relations: ["ownedBooks", "booksToRead"] }
        );
        delete input.userID;
        let book = new Book();
        book = Object.assign(book, input);
        user.booksToRead.push(book);
        let db = await User.save(user);
        console.log(db)
        return book;
      } catch (e) {
        return "Yo something went wrong";
      }
    },
    // deleteOwnedBook: async(_:any, args: any) =>{
    // },
    // deleteBookToRead: async(_:any, args: any) =>{

    // }
  },
};
