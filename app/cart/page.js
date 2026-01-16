'use client'

import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import * as firestore from '@/lib/firestore'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, loading: cartLoading } = useCart()
  const { user, userProfile } = useAuth()
  const [userAddresses, setUserAddresses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserAddresses()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadUserAddresses = async () => {
    try {
      const addresses = await firestore.getUserAddresses(user.uid)
      setUserAddresses(addresses)
    } catch (error) {
      console.error('Error loading addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const cartTotal = getCartTotal()
  const shipping = cartTotal > 499 ? 0 : 99
  const total = cartTotal + shipping

  if (cartLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading cart...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any quirky pieces to your cart yet. Let's fix that!
            </p>
            <div className="space-y-4">
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                <FiShoppingBag />
                Start Shopping
              </Link>
              <p className="text-sm text-gray-500">
                Free shipping on orders over ₹1499 • Easy returns
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="card p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="/placeholder-product.png"
                            alt="Placeholder"
                            className="w-12 h-12 object-contain opacity-50"
                          />
                        )}
                      </div>

                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.productName}</h3>
                          <p className="text-gray-600 text-sm">Size: {item.size}</p>
                          {item.color && (
                            <p className="text-gray-600 text-sm">Color: {item.color}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                          >
                            <FiMinus />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-[var(--primary)]"
              >
                <FiArrowRight className="rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && cartTotal < 1499 && (
                  <div className="text-sm text-green-600">
                    Add ₹{(1499 - cartTotal).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>
              </div>

              {user ? (
                <Link
                  href="/checkout"
                  className="block w-full btn-primary text-center mb-4"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="block w-full btn-primary text-center mb-4"
                >
                  Login to Checkout
                </Link>
              )}

              <p className="text-sm text-center text-gray-500">
                You'll be able to review your order before payment
              </p>

              {/* Delivery Address */}
              {user && userAddresses.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery to</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">{userAddresses[0].name}</p>
                    <p className="text-sm text-gray-600 truncate">{userAddresses[0].address}</p>
                    <p className="text-sm text-gray-600">{userAddresses[0].phone}</p>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">We Accept</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">UPI</div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">Whatsapp</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}