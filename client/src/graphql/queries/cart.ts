import { gql } from '../../generated'

export const GET_CART = gql(`
  query GetCart($id: String!) {
    getCart(id: $id) {
			id
			userId
			guestId
			total
			items {
				id
				quantity
				priceId
				book {
					id
					title
					description
					rating
					images
					prices {
						originalPrice
						discountPrice
						startDate
						endDate
						createdAt
					}
					authors {
						author {
								name
						}
					}
				}
			}
    }
  }
`)
