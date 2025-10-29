import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation, { NAVBAR_HEIGHT } from './components/layout/Navigation.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <main style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '1rem', paddingTop: NAVBAR_HEIGHT + 76, paddingBottom: 56 }}>
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
