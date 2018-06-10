const GRAPHQL_SERVER_URI = 'https://api.savo.nililia.com/graphql';
const SERVER_API_URI = 'https://api.savo.nililia.com';

const SigninUri = `${SERVER_API_URI}/account/auth`;
const FindPasswordUri = `${SERVER_API_URI}/account/forgot/password`;
const IsEmailUri = `${SERVER_API_URI}/account/has/email`;
const SignupUri = `${SERVER_API_URI}/account`;

module.exports = {
  GRAPHQL_SERVER_URI,
  SERVER_API_URI,
  SigninUri,
  FindPasswordUri,
  IsEmailUri,
  SignupUri,
};
