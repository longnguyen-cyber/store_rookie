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
