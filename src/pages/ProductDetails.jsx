import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
      <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={product.image} alt={product.title} style={{ maxHeight: 360, objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ margin: 0 }}>{product.title}</h2>
        <div style={{ color: '#666' }}>{product.category}</div>
        <div style={{ fontWeight: 700, fontSize: 24 }}>${Number(product.price).toFixed(2)}</div>
        <p style={{ lineHeight: 1.6 }}>{product.description}</p>
        <div>
          <Button onClick={() => addItem(product, 1)}>Add to cart</Button>
        </div>
      </div>
    </div>
  )
}


