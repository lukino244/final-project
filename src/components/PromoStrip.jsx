export default function PromoStrip() {
  const itemStyle = {
    border: '1px solid #eee',
    borderRadius: 12,
    padding: 16,
    background: '#fff',
  }
  const title = { margin: 0, fontSize: 16 }
  const text = { margin: 0, color: '#555', fontSize: 13 }
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 16 }}>
      <div style={itemStyle}>
        <h4 style={title}>Free shipping</h4>
        <p style={text}>On orders over $50 in selected regions.</p>
      </div>
      <div style={itemStyle}>
        <h4 style={title}>Secure checkout</h4>
        <p style={text}>256-bit encryption. Your data stays safe.</p>
      </div>
      <div style={itemStyle}>
        <h4 style={title}>24/7 support</h4>
        <p style={text}>We’re here if you need help.</p>
      </div>
    </section>
  )
}


