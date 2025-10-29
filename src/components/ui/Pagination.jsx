export default function Pagination({ page, setPage, totalItems, pageSize = 8 }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const go = (p) => setPage(Math.min(totalPages, Math.max(1, p)))

  const makeRange = () => {
    const maxButtons = 7
    if (totalPages <= maxButtons) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const result = [1]
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    if (start > 2) result.push('…')
    for (let i = start; i <= end; i++) result.push(i)
    if (end < totalPages - 1) result.push('…')
    result.push(totalPages)
    return result
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 64 }}>
      <button onClick={() => go(page - 1)} disabled={page === 1} style={navBtnStyle}>Prev</button>
      {makeRange().map((n, idx) => n === '…' ? (
        <span key={`dots-${idx}`} style={{ padding: '6px 8px', color: '#888' }}>…</span>
      ) : (
        <button
          key={n}
          onClick={() => go(n)}
          style={{
            ...pageBtnStyle,
            ...(n === page ? activeBtnStyle : {}),
          }}
        >{n}</button>
      ))}
      <button onClick={() => go(page + 1)} disabled={page === totalPages} style={navBtnStyle}>Next</button>
    </div>
  )
}

const pageBtnStyle = {
  border: '1px solid #ddd',
  background: '#fff',
  color: '#333',
  padding: '6px 10px',
  borderRadius: 6,
}

const activeBtnStyle = {
  background: '#1a1a1a',
  color: '#fff',
  borderColor: '#1a1a1a',
}

const navBtnStyle = {
  ...pageBtnStyle,
}


