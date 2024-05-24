import { gql } from '../../generated'

export const CATEGORIES_NAME = gql(`
  query Categories {
    categories {
        id
        name
    }
  }
`)
