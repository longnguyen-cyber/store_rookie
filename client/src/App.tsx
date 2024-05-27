import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Error from './pages/Error'
import Home from './pages/Home'
import Shop from './pages/Shop'
import BookDetail from './pages/BookDetail'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
