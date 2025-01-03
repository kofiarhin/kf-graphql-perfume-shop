import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation LoginMutation($loginUserInput: LoginUserInput) {
    loginUser(loginUserInput: $loginUserInput) {
      email
      token
      name
      _id
    }
  }
`;

export const REGISTER_uSER = gql`
  mutation RegisterUserMutation($registerUserInput: RegisterUserInput) {
    registerUser(registerUserInput: $registerUserInput) {
      name
      email
    }
  }
`;
