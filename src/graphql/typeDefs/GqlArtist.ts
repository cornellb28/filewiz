import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const GqlArtist = new GraphQLObjectType({
  name: "Artist",
  description: "An Artist",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "id of the book",
    },
    title: {
      type: GraphQLString,
      description: "title of Artist",
    },
    artist: {
      type: GraphQLString,
      description: "The Artist",
    },
  },
});
