// mutation CreateOrder {
//   createOrder(
//       data: {
//           items: { createMany: { data: { bookId: "3", quantity: 3, priceId: "3" } } }
//       }
//       guestId: "3453"
//   ) {
//       id
//       userId
//       orderDate
//       status
//   }
// }

import { gql } from '../../generated'

export const PLACE_ORDER = gql(`
  mutation CreateOrder($data: CreateOrderInput!, $guestId: String!) {
    createOrder(data: $data, guestId: $guestId) {
      id
      userId
      orderDate
      status
      payment
      address
      shipping
    }
  }

`)
