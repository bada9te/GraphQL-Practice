const { gql } = require("apollo-server");

module.exports = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    type Query {
        users: [User!]!
    }

`;