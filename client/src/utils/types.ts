import { ChangeEvent, FormEvent } from 'react'

export type FormSubmit = FormEvent<HTMLFormElement>
export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLSelectElement
>

export interface ILoignInput {
  email: string
  password: string
}

export interface IUser {
  id: string
  username: string
  email: string
  isAdmin: boolean
}

export type AuthContextType = {
  token: string | null
  user: IUser | undefined
  login: (data: ILoignInput) => void
}
