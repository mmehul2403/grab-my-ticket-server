/**
 * @description UserSchema is designed for operations definitions with the table user
 * @author Emma
 * @date 2024-06
 */
const { gql } = require("apollo-server-express");

const UserSchema = gql`
  enum UserRole {
    User
    Cinema
    Admin
  }

  type User {
    user_id: Int!
    first_name: String
    last_name: String
    date_of_birth: String
    register_date: String
    role: UserRole
    password: String
    telephone_number: String
    email_address: String
    lock_status: Int
  }

  type Result {
    code: Int
    message: String
  }

  input UserInput {
    first_name: String
    last_name: String
    date_of_birth: String
    register_date: String
    role: UserRole
    password: String
    telephone_number: String
    email_address: String
    lock_status: Int
  }

  input UserUpdate {
    user_id: Int!
    first_name: String
    last_name: String
    date_of_birth: String
    register_date: String
    role: UserRole
    password: String
    telephone_number: String
    email_address: String
    lock_status: Int
  }

  type CurrentUser {
    user_id: Int!
    email_address: String
    first_name: String
    last_name: String
    date_of_birth: String
    register_date: String
    role: UserRole
  }

  type Query {
    currentUser: CurrentUser
    getUserById(user_id: Int!): User
    validateEmail(email_address: String): Result
  }

  type Mutation {
    createUser(user: UserInput!): User
    updateUser(user: UserUpdate): User
    deleteUser(user_id: Int!): User
    signIn(email_address: String, password: String): Result
    signOut: Result
  }
`;

module.exports = UserSchema;
