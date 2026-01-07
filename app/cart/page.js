'use client'

import { useCart } from '@/context/CartContext'
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

  const cartTotal = getCartTotal()
  const shipping = cartTotal > 1499 ? 0 : 99
  const total = cartTotal + shipping

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
                <div key={`${item.id}-${item.size}`} className="card p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <div className="text-3xl">{item.emoji}</div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.category}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600">Size: {item.size}</span>
                            <span className="text-sm text-gray-600">Color: Black</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                          >
                            <FiMinus />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
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
                {shipping > 0 && (
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

              <Link
                href="/checkout"
                className="block w-full btn-primary text-center mb-4"
              >
                Proceed to Checkout
              </Link>

              <p className="text-sm text-center text-gray-500">
                You'll be able to review your order before payment
              </p>

              {/* Payment Methods */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">We Accept</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">UPI</div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">Cards</div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">Net Banking</div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">Wallet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}