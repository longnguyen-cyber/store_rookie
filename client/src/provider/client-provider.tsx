'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { PropsWithChildren } from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
})

type Props = object

function ClientProvider({ children }: PropsWithChildren<Props>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ClientProvider
