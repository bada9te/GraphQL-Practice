const { ApolloServer } = require("apollo-server");
const typeDefs = require('./schema/type-defs');
const resolvers = require('./schema/resolvers');

const SERVER = new ApolloServer({ typeDefs, resolvers });


SERVER.listen().then(({url}) => {
    console.log(`API is running at: ${url}`);
});