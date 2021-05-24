import { Any } from "typeorm";
import { Book } from "./entity/Book";
import { User } from "./entity/User";

// Provide resolver functions for your schema fields
export const resolvers = ((userRepo) => ({
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;
      const user = await User.findOne({ where: { id: id }, relations:["ownedBooks"]});
      console.log(user)
      return user
    },
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const { firstName, lastName, age } = args;
      try {
        let user = userRepo.create({
          firstName,
          lastName,
          age,
        });

        user = await User.save(user);

        return user;
      } catch (error) {
        return false;
      }
    },
    createOwnedBook: async (_: any, { input }: any) => {
      const userID = input.userID;
      try {
        const user = await User.findOne({ id: userID });
        delete input.userID; 
        let book = new Book()
        book = Object.assign({}, input)
        user.ownedBooks = [book]
        User.save(user)
        return book;
      } catch (e) {
        return "Yo something went wrong";
      }
    },
    // createBookToRead: async (_: any, args: any) =>{
    // },
    // deleteOwnedBook: async(_:any, args: any) =>{
    // },
    // deleteBookToRead: async(_:any, args: any) =>{

    // }
  },
}))();
