import { Route, Routes } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import Navbar from './components/Navbar'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import Error from './pages/Error'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Verification from './pages/Verification'
function App() {
  const guestId = localStorage.getItem('guestId')
  if (!guestId) {
    localStorage.setItem('guestId', uuidv4())
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/auth/verify-email" element={<Verification />} />

      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App
