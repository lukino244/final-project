import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/ui/Pagination.jsx'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        if (!cancelled) setProducts(data)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Error loading products')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const [page, setPage] = useState(1)
  const pageSize = 8
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return products.slice(start, start + pageSize)
  }, [products, page])

  if (loading) return <div>Loading products…</div>
  if (error) return <div style={{ color: 'tomato' }}>{error}</div>

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {paged.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalItems={products.length} pageSize={pageSize} />
    </>
  )
}


