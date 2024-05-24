import { useQuery } from '@apollo/client'

import { gql } from '../src/__generated__'

const test = gql(/* GraphQL */ `
  query HealhCheck {
    healhCheck
  }
`)

function App() {
  const { data } = useQuery(test)
  console.log(data)
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>
}

export default App
