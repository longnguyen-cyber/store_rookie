// mutation CreateOrder {
//   createReview(
//       data: {
//           book: { connect: { id: "1" } }
//           title: "sdsaf"
//           content: "asdfsafdasf"
//           rating: 3
//       }
//   )
// }

import { gql } from '../../generated'

export const CREATE_REVIEW = gql(`
  mutation CreateReview($data: CreateReviewInput!) {
    createReview(data: $data)
  }
`)
