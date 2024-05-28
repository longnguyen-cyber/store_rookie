import { Route, Routes } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import Navbar from './components/Navbar'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import Error from './pages/Error'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
function App() {
  const guestId = localStorage.getItem('guestId')
  if (!guestId) {
    localStorage.setItem('guestId', uuidv4())
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App
