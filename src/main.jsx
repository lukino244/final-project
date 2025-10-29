import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { BasketProvider } from './context/BasketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BasketProvider>
        <App />
      </BasketProvider>
    </BrowserRouter>
  </StrictMode>,
)
