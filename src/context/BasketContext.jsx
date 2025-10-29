import { createContext, useContext, useMemo, useReducer } from 'react'

const BasketContext = createContext(null)

function basketReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existing = state.items[product.id]
      const newQty = (existing?.quantity ?? 0) + (quantity ?? 1)
      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: {
            product,
            quantity: newQty,
          },
        },
      }
    }
    case 'REMOVE_ITEM': {
      const { productId } = action.payload
      const next = { ...state.items }
      delete next[productId]
      return { ...state, items: next }
    }
    case 'UPDATE_QTY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        const next = { ...state.items }
        delete next[productId]
        return { ...state, items: next }
      }
      const existing = state.items[productId]
      if (!existing) return state
      return {
        ...state,
        items: {
          ...state.items,
          [productId]: { ...existing, quantity },
        },
      }
    }
    case 'CLEAR': {
      return { items: {} }
    }
    default:
      return state
  }
}

export function BasketProvider({ children }) {
  const [state, dispatch] = useReducer(basketReducer, { items: {} })

  const value = useMemo(() => {
    const entries = Object.values(state.items)
    const totalQuantity = entries.reduce((sum, it) => sum + it.quantity, 0)
    const subtotal = entries.reduce(
      (sum, it) => sum + it.quantity * Number(it.product.price ?? 0),
      0
    )
    const addItem = (product, quantity = 1) =>
      dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
    const removeItem = (productId) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
    const updateQuantity = (productId, quantity) =>
      dispatch({ type: 'UPDATE_QTY', payload: { productId, quantity } })
    const clear = () => dispatch({ type: 'CLEAR' })

    return {
      items: state.items,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }
  }, [state])

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export function useBasket() {
  const ctx = useContext(BasketContext)
  if (!ctx) throw new Error('useBasket must be used within BasketProvider')
  return ctx
}


