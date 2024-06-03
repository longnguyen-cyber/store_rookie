import { gql } from '../../generated'

export const LOGIN = gql(`
  mutation Login( $userLoginDto: LoginInput!) {
    login(userLoginDto: $userLoginDto) {
      user {
        id
        username
        email
        isAdmin
      }
      token
    }
  }
`)

export const LOGOUT = gql(`
  mutation Logout {
      logout
  }
`)

export const REGISTER = gql(`
  mutation Register($userCreateDto: RegisterDTO!) {
    register(userCreateDto: $userCreateDto)
  }
`)

export const VERIFY_EMAIL = gql(`
  mutation VerifyEmail($accessToken: String!) {
    verifyEmail(accessToken: $accessToken)
  }
`)
