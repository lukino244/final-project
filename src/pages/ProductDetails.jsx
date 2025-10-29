import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import { useBasket } from '../context/BasketContext.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addItem } = useBasket()

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) throw new Error('Failed to fetch product')
        const data = await res.json()
        if (!cancelled) setProduct(data)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Error loading product')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) return <div>Loading product…</div>
  if (error) return <div style={{ color: 'tomato' }}>{error}</div>
  if (!product) return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
      <div style={{ gridColumn: '1 / -1', marginBottom: 4 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#646cff' }}>← Back to products</Link>
      </div>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <img src={product.image} alt={product.title} style={{ maxHeight: 380, objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, background: '#f1f5f9', border: '1px solid #e5e5e5', padding: '2px 8px', borderRadius: 999 }}>{product.category}</span>
          {product.rating?.rate != null && (
            <span style={{ fontSize: 12, color: '#111' }}>★ {product.rating.rate} ({product.rating.count})</span>
          )}
        </div>
        <h2 style={{ margin: 0 }}>{product.title}</h2>
        <div style={{ fontWeight: 800, fontSize: 28 }}>${Number(product.price).toFixed(2)}</div>
        <p style={{ lineHeight: 1.7, color: '#333' }}>{product.description}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button onClick={() => addItem(product, 1)}>Add to cart</Button>
        </div>
      </div>
    </div>
  )
}


