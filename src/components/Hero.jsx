import { Link } from 'react-router-dom'
import Button from './ui/Button.jsx'

export default function Hero() {
  return (
    <section style={{
      borderRadius: 16,
      padding: '32px 24px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
      border: '1px solid #e5e7eb',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 24,
      alignItems: 'center',
      marginBottom: 24,
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.2 }}>Discover products you’ll love</h1>
        <p style={{ marginTop: 8, color: '#4b5563' }}>Curated items from the Fake Store API. Add to cart and try our checkout flow.</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <a href="#products"><Button>Shop now</Button></a>
          <Link to="/cart"><Button variant="outline">View cart</Button></Link>
        </div>
      </div>
      <div style={{ display: 'none' }} />
    </section>
  )
}


