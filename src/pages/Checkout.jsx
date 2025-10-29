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
    return <div style={{ display: 'grid', placeItems: 'center', padding: '3rem 0' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 8 }}>Order placed!</h2>
        <div style={{ color: '#666' }}>Thanks for your purchase. This was a fake checkout.</div>
      </div>
    </div>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
      <form onSubmit={placeOrder} style={{ display: 'grid', gap: 16 }}>
        <section style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Shipping</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <input required placeholder="Full name" style={inputStyle} />
            <input required placeholder="Email" type="email" style={inputStyle} />
            <input required placeholder="Address" style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input required placeholder="City" style={inputStyle} />
              <input required placeholder="Postal code" style={inputStyle} />
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Payment</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <input required placeholder="Card number" style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input required placeholder="MM/YY" style={inputStyle} />
              <input required placeholder="CVC" style={inputStyle} />
            </div>
          </div>
        </section>

        <Button type="submit" disabled={placing || list.length === 0}>{placing ? 'Placing…' : 'Place order'}</Button>
      </form>

      <aside style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, height: 'fit-content', background: '#fff' }}>
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Order summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.length === 0 && <div>No items</div>}
          {list.map(({ product, quantity }) => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ color: '#333' }}>{product.title} × {quantity}</div>
              <div style={{ fontWeight: 600 }}>${(quantity * Number(product.price)).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee', fontWeight: 800 }}>
          <div>Total</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>
      </aside>
    </div>
  )
}

const inputStyle = {
  padding: 12,
  borderRadius: 8,
  border: '1px solid #ddd',
}


