import { useQuery } from '@apollo/client'

import { gql } from '../src/__generated__'
import './App.css'

const test = gql(/* GraphQL */ `
  query HealhCheck {
    healhCheck
  }
`)

function App() {
  const { data } = useQuery(test)
  console.log(data)
  return <div className="App"></div>
}

export default App
