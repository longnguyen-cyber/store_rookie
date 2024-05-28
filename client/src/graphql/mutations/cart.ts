import { gql } from '../../generated'

export const ADD_ITEM_TO_CART = gql(`
  mutation AddItemToCart($items: CartItemCreateInput!, $userId: String!, $type: String!) {
    addItemToCart(items: $items, userId: $userId, type: $type)
  }
`)

export const UPDATE_QUANTITY_OF_ITEM = gql(`
  mutation UpdateQuantityOfItem($id: String!, $quantity: String!) {
    updateQuantityOfItem(id: $id, quantity: $quantity)
  }
`)

export const REMOVE_ITEM_FROM_CART = gql(`
  mutation RemoveItemFromCart($id: String!) {
    removeItemFromCart(id: $id)
  }
`)
