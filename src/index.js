const { GraphQLServer } = require('graphql-yoga');

/** 
 * The resolvers object is the actual implementation of the GraphQL schema.
 * Notice how its structure is identical to the structure of the type definition
 * inside typeDefs: Query.info.
 * 
 */

 let links = [
     {
         id: 'link-0',
         description: 'A really cool website',
         link: 'www.humansinward.com'
     }
 ];

 let idCount = links.length;

 const getLink = (id) => links.find(e => e.id === id) || null

const resolvers = {
    Query: {
        info: () => 'This is my first API',
        feed: () => links,
        link: (root, args) => getLink(args.id)
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                link: args.url
            };
            links.push(link);
            return link;
        },
        
        updateLink: (root, args) => {
            const link = getLink(args.id);
            if (link) {
                if (args.url) {
                    link.link = args.url;
                }

                if (args.description) {
                    link.description = args.description;
                }

                const linkIndex = links.findIndex(e => e.id === args.id);
                links.splice(linkIndex, 1, link);

                return link;
            }
            return null;
        }

    }
};

/** 
 * Finally, the schema and resolvers are bundled and passed to the GraphQLServer
 * which is imported from graphql-yoga.
 * This tells the server what API operations are accepted and how they should be resolved.
 * 
 */

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log('server is running on port 4000'));