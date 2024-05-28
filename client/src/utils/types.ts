import { ChangeEvent } from 'react'

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export enum Quantity {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export interface QUANTITY_TYPE {
  quantity: Quantity
}
