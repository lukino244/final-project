import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import Hero from '../components/Hero.jsx'
import PromoStrip from '../components/PromoStrip.jsx'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState(['all'])
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('relevance')

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

  useEffect(() => {
    let cancelled = false
    async function loadCats() {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        if (!cancelled) setCategories(['all', ...data])
      } catch {}
    }
    loadCats()
    return () => { cancelled = true }
  }, [])

  const [page, setPage] = useState(1)
  const pageSize = 8
  const filtered = useMemo(() => {
    let list = products
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q))
    }
    switch (sort) {
      case 'price-asc': list = [...list].sort((a,b)=>Number(a.price)-Number(b.price)); break
      case 'price-desc': list = [...list].sort((a,b)=>Number(b.price)-Number(a.price)); break
      case 'title': list = [...list].sort((a,b)=>a.title.localeCompare(b.title)); break
      default: break
    }
    return list
  }, [products, category, query, sort])

  useEffect(() => { setPage(1) }, [category, query, sort])

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  if (loading) return <div>Loading products…</div>
  if (error) return <div style={{ color: 'tomato' }}>{error}</div>

  return (
    <>
      <Hero />
      <PromoStrip />
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search products"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', flex: '1 1 260px' }}
        />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}>
          {categories.map(c => <option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>)}
        </select>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}>
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
      <div id="products" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {paged.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalItems={filtered.length} pageSize={pageSize} />
    </>
  )
}


