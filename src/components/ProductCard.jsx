import { Link } from 'react-router-dom'
import Button from './ui/Button.jsx'
import { useBasket } from '../context/BasketContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useBasket()
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e5e5e5',
      borderRadius: 8,
      padding: 12,
      gap: 8,
    }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <img src={product.image} alt={product.title} style={{ height: 160, objectFit: 'contain', width: '100%' }} />
        <div style={{ fontWeight: 600, marginTop: 8 }}>{product.title}</div>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700 }}>${Number(product.price).toFixed(2)}</div>
        <Button onClick={() => addItem(product, 1)}>Add to cart</Button>
      </div>
    </div>
  )
}


