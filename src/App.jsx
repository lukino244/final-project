import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/layout/Navigation.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <div>
      <Navigation />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
