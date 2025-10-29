import { useState } from 'react'
import Button from '../components/ui/Button.jsx'
import { useBasket } from '../context/BasketContext.jsx'

export default function Checkout() {
  const { items, subtotal, clear } = useBasket()
  const [placing, setPlacing] = useState(false)
  const [success, setSuccess] = useState(false)
  const list = Object.values(items)

  const placeOrder = async (e) => {
    e.preventDefault()
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 800))
    clear()
    setSuccess(true)
    setPlacing(false)
  }

  if (success) {
    return <div style={{ textAlign: 'center' }}>
      <h2>Order placed!</h2>
      <div>Thanks for your purchase. This was a fake checkout.</div>
    </div>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
      <form onSubmit={placeOrder} style={{ display: 'grid', gap: 12 }}>
        <h3 style={{ margin: 0 }}>Shipping</h3>
        <input required placeholder="Full name" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input required placeholder="Email" type="email" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input required placeholder="Address" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input required placeholder="City" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          <input required placeholder="Postal code" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <h3 style={{ marginBottom: 0 }}>Payment</h3>
        <input required placeholder="Card number" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input required placeholder="MM/YY" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          <input required placeholder="CVC" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <Button type="submit" disabled={placing || list.length === 0}>{placing ? 'Placing…' : 'Place order'}</Button>
      </form>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 16, height: 'fit-content' }}>
        <h3 style={{ marginTop: 0 }}>Order summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.length === 0 && <div>No items</div>}
          {list.map(({ product, quantity }) => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{product.title} × {quantity}</div>
              <div>${(quantity * Number(product.price)).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontWeight: 700 }}>
          <div>Total</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}


