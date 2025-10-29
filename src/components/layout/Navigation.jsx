import { Link, NavLink } from 'react-router-dom'
import { useBasket } from '../../context/BasketContext.jsx'

export default function Navigation() {
  const { totalQuantity } = useBasket()

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      borderBottom: '1px solid #e5e5e5',
    }}>
      <Link to="/" style={{ fontWeight: 700, textDecoration: 'none' }}>ShopMate</Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
        <NavLink to="/cart" style={{ textDecoration: 'none' }}>Cart ({totalQuantity})</NavLink>
        <NavLink to="/checkout" style={{ textDecoration: 'none' }}>Checkout</NavLink>
      </div>
    </nav>
  )
}


