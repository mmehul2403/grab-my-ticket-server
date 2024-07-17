const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum UserRole {
    User
    Cinema
    Admin
  }

  type User {
    user_id: Int!
    email_address: String
    password: String
    first_name: String
    last_name: String
    date_of_birth: String
    register_date: String
    telephone_number: String
    role: UserRole
    lock_status: Int
  }

  type PaginatedUsers {
    users: [User]
    totalCount: Int
  }

  type Query {
    getAllUsers(page: Int!, limit: Int!): PaginatedUsers
  }

  input UpdateUserInput {
    user_id: Int!
    email_address: String
    first_name: String
    last_name: String
    date_of_birth: String
    telephone_number: String
    role: UserRole
    lock_status: Int
  }

  type Mutation {
    updateUserOperation(input: UpdateUserInput!): User
  }
`;

module.exports = typeDefs;
