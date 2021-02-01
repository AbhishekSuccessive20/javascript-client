import { gql } from '@apollo/client';

const LOGIN_USER = gql`mutation LoginUser($email: String!, $password: String!) {
  loginUser(payload: { email: $email, password: $password }) {
    message
    status
    data
  }
}`;

export {
  LOGIN_USER,
};
