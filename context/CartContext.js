'use client'

import { createContext, useState, useContext, useEffect, useRef } from 'react'

import { useAuth } from './AuthContext'
import * as firestore from '@/lib/firestore'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromFirestore()
    } else {
      // Load from localStorage for guests
      const savedCart = localStorage.getItem('fnf_guest_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    // Save guest cart to localStorage
    if (!user) {
      localStorage.setItem('fnf_guest_cart', JSON.stringify(cart))
    }

    // Calculate cart stats
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0)
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

    setCartCount(count)
    setCartTotal(total)
  }, [cart, user])

  const loadCartFromFirestore = async () => {
    try {
      setLoading(true)
      if (user) {
        const cartItems = await firestore.getUserCart(user.uid)
        setCart(cartItems)
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product, size, quantity = 1, color = null) => {
    if (!product?.id || !size) {
      console.error('Invalid addToCart call', { product, size })
      return
    }

    if (user && !user.uid) {
      console.error('User not ready yet')
      return
    }

    const finalPrice = product.discountPrice ?? product.price

    const cartItem = {
      productId: product.id,
      productName: product.name,
      productImage: product.images?.[0] || null,
      price: finalPrice,
      size,
      color: color || product.colors?.[0] || null,
      quantity,
      product: {
        id: product.id,
        name: product.name,
        price: finalPrice,
        images: product.images
      }
    }




    if (user) {
      const success = await firestore.addToCart(user.uid, cartItem)
      if (success) {
        await loadCartFromFirestore()
      }
    } else {
      setCart(prev => {
        const existingItem = prev.find(item =>
          item.productId === product.id &&
          item.size === size &&
          item.color === cartItem.color
        )

        if (existingItem) {
          return prev.map(item =>
            item.productId === product.id &&
              item.size === size &&
              item.color === cartItem.color
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }

        return [...prev, { ...cartItem, id: Date.now().toString() }]
      })
    }
  }


  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }

    if (user) {
      const success = await firestore.updateCartItem(user.uid, itemId, { quantity })
      if (success) {
        await loadCartFromFirestore()
      }
    } else {
      setCart(prev => prev.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const removeFromCart = async (itemId) => {
    if (user) {
      const success = await firestore.removeFromCart(user.uid, itemId)
      if (success) {
        await loadCartFromFirestore()
      }
    } else {
      setCart(prev => prev.filter(item => item.id !== itemId))
    }
  }

  const clearCart = async () => {
    if (user) {
      const success = await firestore.clearCart(user.uid)
      if (success) {
        setCart([])
      }
    } else {
      setCart([])
      localStorage.removeItem('fnf_guest_cart')
    }
  }

  const getCartTotal = () => {
    return cartTotal
  }

const syncGuestCartToUser = async () => {
  const guestCart = JSON.parse(localStorage.getItem("fnf_guest_cart") || "[]")

  if (!user || guestCart.length === 0) return

  try {
    for (const item of guestCart) {
      await firestore.addToCart(user.uid, {
        ...item,
        quantity: item.quantity || 1
      })
    }

    localStorage.removeItem("fnf_guest_cart")
  } catch (err) {
    console.error("Cart sync failed", err)
  }
}




  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      cartTotal,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      syncGuestCartToUser
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)