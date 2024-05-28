import { gql } from '../../generated'

export const ADD_ITEM_TO_CART = gql(`
  mutation AddItemToCart($items: CartItemCreateInput!, $userId: String!, $type: String!) {
    addItemToCart(items: $items, userId: $userId, type: $type)
  }
`)
