import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import { useBasket } from '../context/BasketContext.jsx'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useBasket()
  const list = Object.values(items)

  if (list.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link to="/">Go shopping</Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map(({ product, quantity }) => (
          <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px', gap: 12, alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: 8, padding: 12 }}>
            <img src={product.image} alt={product.title} style={{ height: 64, objectFit: 'contain' }} />
            <div>
              <div style={{ fontWeight: 600 }}>{product.title}</div>
              <div style={{ color: '#666' }}>${Number(product.price).toFixed(2)} each</div>
            </div>
            <div>
              <input
                type="number"
                min={0}
                value={quantity}
                onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => removeItem(product.id)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 16, height: 'fit-content' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>Subtotal</div>
          <div style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</div>
        </div>
        <div style={{ color: '#666', fontSize: 12, marginBottom: 12 }}>Taxes and shipping calculated at checkout</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/checkout"><Button>Proceed to checkout</Button></Link>
          <Button variant="outline" onClick={clear}>Clear cart</Button>
        </div>
      </div>
    </div>
  )
}


