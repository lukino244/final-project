import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import { useBasket } from '../context/BasketContext.jsx'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useBasket()
  const list = Object.values(items)

  if (list.length === 0) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', padding: '3rem 0' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 8 }}>Your cart is empty</h2>
          <div style={{ color: '#666', marginBottom: 16 }}>Browse products and add items to your basket.</div>
          <Link to="/"><Button>Continue shopping</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
      <section style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
        <header style={{ display: 'grid', gridTemplateColumns: '80px 1fr 140px 120px', padding: '12px 16px', fontSize: 12, color: '#666', background: '#fafafa', borderBottom: '1px solid #eee' }}>
          <div>Item</div>
          <div>Details</div>
          <div>Quantity</div>
          <div style={{ textAlign: 'right' }}>Total</div>
        </header>
        <div>
          {list.map(({ product, quantity }) => {
            const lineTotal = quantity * Number(product.price)
            return (
              <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 140px 120px', gap: 12, alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f1f1' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={product.image} alt={product.title} style={{ height: 64, width: 64, objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{product.title}</div>
                  <div style={{ color: '#666', fontSize: 12 }}>${Number(product.price).toFixed(2)} each</div>
                  <button onClick={() => removeItem(product.id)} style={{ background: 'transparent', border: 'none', color: '#888', padding: 0, marginTop: 6, cursor: 'pointer' }}>Remove</button>
                </div>
                <div>
                  <input
                    type="number"
                    min={0}
                    value={quantity}
                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ textAlign: 'right', fontWeight: 700 }}>${lineTotal.toFixed(2)}</div>
              </div>
            )
          })}
        </div>
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
          <Link to="/" style={{ color: '#646cff', textDecoration: 'none' }}>← Continue shopping</Link>
          <button onClick={clear} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Clear cart</button>
        </footer>
      </section>

      <aside style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, height: 'fit-content', background: '#fff' }}>
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Order summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>Subtotal</div>
          <div style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#666' }}>
          <div>Shipping</div>
          <div>Calculated at checkout</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee', fontWeight: 800 }}>
          <div>Total</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to="/checkout"><Button style={{ width: '100%' }}>Proceed to checkout</Button></Link>
        </div>
      </aside>
    </div>
  )
}


