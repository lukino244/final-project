import { Link, NavLink } from 'react-router-dom'
import { useBasket } from '../../context/BasketContext.jsx'

export const NAVBAR_HEIGHT = 56;

export default function Navigation() {
  const { totalQuantity } = useBasket()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      height: NAVBAR_HEIGHT,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      borderBottom: '1px solid #eee',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: '100%', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontWeight: 800, textDecoration: 'none', color: '#111', fontSize: 22, letterSpacing: 0.5 }}>ShopMate</Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <NavLink to="/" style={({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#111' : '#555', fontWeight: isActive ? 700 : 500 })}>Home</NavLink>
          <NavLink to="/cart" style={({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#111' : '#555', fontWeight: isActive ? 700 : 500 })}>Cart ({totalQuantity})</NavLink>
          <NavLink to="/checkout" style={({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#111' : '#555', fontWeight: isActive ? 700 : 500 })}>Checkout</NavLink>
        </div>
      </div>
    </nav>
  )
}


