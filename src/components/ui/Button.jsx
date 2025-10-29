export default function Button({ children, variant = 'primary', ...props }) {
  const style = {
    primary: {
      backgroundColor: '#1a1a1a',
      color: '#fff',
      border: '1px solid transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      border: '1px solid #1a1a1a',
    },
  }[variant]

  return (
    <button style={{ borderRadius: 8, padding: '0.6em 1.2em', ...style }} {...props}>
      {children}
    </button>
  )
}


