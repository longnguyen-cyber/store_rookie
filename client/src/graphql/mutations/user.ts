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
