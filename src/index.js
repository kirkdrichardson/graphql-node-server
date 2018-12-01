const { GraphQLServer } = require('graphql-yoga');



/**
 * The typeDefs constant defines your GraphQL schema.
 * Here, it defines a simple Query type with one field called info.
 * This field has the type String!.
 * The exclamation mark in the type definition means that this field can never be null.
 */

const typeDefs = `
    type Query {
        info: String!
    }
`;

/** 
 * The resolvers object is the actual implementation of the GraphQL schema.
 * Notice how its structure is identical to the structure of the type definition
 * inside typeDefs: Query.info.
 * 
 */

const resolvers = {
    Query: {
        info: () => 'This is my first API'
    }
};

/** 
 * Finally, the schema and resolvers are bundled and passed to the GraphQLServer
 * which is imported from graphql-yoga.
 * This tells the server what API operations are accepted and how they should be resolved.
 * 
 */

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log('server is running on port 4000'));