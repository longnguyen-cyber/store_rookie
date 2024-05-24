import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Error from './pages/Error'
import Home from './pages/Home'
import Shop from './pages/Shop'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
