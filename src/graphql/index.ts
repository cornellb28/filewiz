const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Yeah",
    artist: "Ivan Ave",
  },
  {
    title: "Peace",
    artist: "Ivan Ave",
  },
  {
    title: "Music is Life",
    artist: "Ivan Ave",
  },
  {
    title: "Hip Hop",
    artist: "Ivan Ave",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    artist: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV !== "production",
});

server
  .listen()
  .then(({ url }: { url: string }) => {
    console.log(`Server ready at ${url}graphql`);
  })
  .catch((err: Error) => console.log(`Error: ${err}`));
