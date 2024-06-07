import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { PropsWithChildren } from 'react'

const httpLink = createHttpLink({
  uri: 'http://localhost:40000/graphql/',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

type Props = object

function ClientProvider({ children }: PropsWithChildren<Props>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ClientProvider
