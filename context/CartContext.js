'use client'

import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem('fnf_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('fnf_cart', JSON.stringify(cart))
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0))
  }, [cart])

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.size === size
      )
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...prev, { ...product, size, quantity }]
    })
  }

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => 
      !(item.id === productId && item.size === size)
    ))
  }

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, size)
      return
    }
    
    setCart(prev => prev.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('fnf_cart')
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)