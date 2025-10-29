export default function Footer() {
  return (
    <footer style={{
      marginTop: '2rem',
      padding: '1rem',
      borderTop: '1px solid #e5e5e5',
      textAlign: 'center',
      fontSize: 12,
      color: '#666'
    }}>
      © {new Date().getFullYear()} ShopMate. All rights reserved.
    </footer>
  )
}


