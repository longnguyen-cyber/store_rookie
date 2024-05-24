import { gql } from '../../generated'

export const AUTHOR_NAME = gql(`
  query Authors {
    authors {
        id
        name
    }
  }
`)
