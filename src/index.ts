import "reflect-metadata";
import { User } from "./entity/User";
import { Book } from "./entity/Book";

import { createConnection } from "typeorm";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const userRepo = await (await createConnection()).getRepository(User);
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();

// createConnection()
//   .then(async (connection) => {
//     const userRepo = connection.getRepository(User);
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     const book = new Book();
//     user.name = "Bryson";
//     book.authors = ["Steven Erikson"];
//     book.coverURL =
//       "http://books.google.com/books/content?id=QRlkvgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api";
//     book.description =
//       "Savaged by the K'Chain Nah'Ruk, the Bonehunters march for Kolanse, where waits an unknown fate. Tormented by questions, the army totters on the edge of mutiny, but Adjunct Tavore will not relent. One final act remains, if it is in her power, if she can hold her army together, if the shaky allegiances she has forged can survive all that is to come. A woman with no gifts of magic, deemed plain, unprepossessing, displaying nothing to instill loyalty or confidence, Tavore Paran of House Paran means to challenge the gods – if her own troops don't kill her first. Awaiting Tavore and her allies are the Forkrul Assail, the final arbiters of humanity. Drawing upon an alien power terrible in its magnitude, they seek to cleanse the world, to annihilate every human, every civilization, in order to begin anew. They welcome the coming conflagration of slaughter, for it shall be of their own devising, and it pleases them to know that, in the midst of the enemies gathering against them, there shall be betrayal. In the realm of Kurald Galain, home to the long lost city of Kharkanas, a mass of refugees stand upon the First Shore. Commanded by Yedan Derryg, the Watch, they await the breaching of Lightfall, and the coming of the Tiste Liosan. This is a war they cannot win, and they will die in the name of an empty city and a queen with no subjects. Elsewhere, the three Elder Gods, Kilmandaros, Errastas and Sechul Lath, work to shatter the chains binding Korabas, the Otataral Dragon, from her eternal prison. Once freed, she will rise as a force of devastation, and against her no mortal can stand. At the Gates of Starvald Demelain, the Azath House sealing the portal is dying. Soon will come the Eleint, and once more, there will be dragons in the world.";
//     book.isbn = "9780765316561";
//     book.language = "en";
//     book.pageCount = 928;
//     book.publishedDate = "2011-03-01";
//     book.publisher = "Tor";
//     book.title = "The Crippled God: Book Ten of The Malazan Book of the Fallen";
//     user.ownedBooks = [book];
//     book.categories = ["Fantasy", "Fiction"]
//     await userRepo.save(user);
//     console.log("Saved a new user with id: " + user);

//     console.log("Loading users from the database...");
//     const users = await userRepo.find({relations:["ownedBooks"]});
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
