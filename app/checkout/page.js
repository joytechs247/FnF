'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { FiMapPin, FiPackage, FiCreditCard, FiCheck, FiArrowRight, FiEdit2 } from 'react-icons/fi'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const cartTotal = getCartTotal()
  const shipping = cartTotal > 1499 ? 0 : 99
  const total = cartTotal + shipping

  // Mock addresses
  const addresses = [
    {
      id: 1,
      name: 'Home',
      address: '123 Street, City, State 123456',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      name: 'Office',
      address: '456 Corporate Tower, Business District',
      phone: '+91 9876543211',
      isDefault: false
    }
  ]

  const [selectedAddress, setSelectedAddress] = useState(addresses[0])

  const handlePlaceOrder = () => {
    // In a real app, save order to Firestore here
    console.log('Order placed:', {
      items: cart,
      total,
      address: selectedAddress,
      paymentMethod,
      user: user?.email
    })
    
    clearCart()
    setStep(3)
    setIsOrderPlaced(true)
  }

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Login Required</h1>
            <p className="text-gray-600 mb-8">
              Please login to proceed with checkout
            </p>
            <div className="space-y-4">
              <Link href="/auth/login" className="btn-primary inline-block">
                Login to Continue
              </Link>
              <p className="text-sm text-gray-500">
                New to FibresNFools?{' '}
                <Link href="/auth/signup" className="text-[var(--primary)]">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Add some awesome products to your cart first!
            </p>
            <Link href="/shop" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= stepNumber
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <FiCheck /> : stepNumber}
                </div>
                <span className={`text-sm font-medium ${
                  step >= stepNumber ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {stepNumber === 1 ? 'Address' : stepNumber === 2 ? 'Payment' : 'Confirmation'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiMapPin className="text-2xl text-[var(--primary)]" />
                <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
              </div>

              {/* Address List */}
              <div className="space-y-4 mb-8">
                {addresses.map(address => (
                  <label
                    key={address.id}
                    className={`block p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--primary)] transition-colors ${
                      selectedAddress.id === address.id
                        ? 'border-[var(--primary)] bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="mt-1"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">{address.name}</h3>
                            {address.isDefault && (
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full ml-2">
                                Default
                              </span>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FiEdit2 />
                          </button>
                        </div>
                        <p className="text-gray-600 mt-2">{address.address}</p>
                        <p className="text-gray-600 mt-1">{address.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Add New Address */}
              <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors mb-8">
                + Add New Address
              </button>

              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Continue to Payment
                <FiArrowRight />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Payment Methods */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FiCreditCard className="text-2xl text-[var(--primary)]" />
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'upi', name: 'UPI', icon: '📱', description: 'Instant payment with UPI' },
                    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Pay with your card' },
                    { id: 'cod', name: 'Cash on Delivery', icon: '💰', description: 'Pay when you receive' },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--primary)] transition-colors ${
                        paymentMethod === method.id
                          ? 'border-[var(--primary)] bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-5 h-5"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{method.icon}</span>
                            <h3 className="font-bold text-gray-900">{method.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">UPI Payment</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Scan the QR code or use UPI ID to complete payment
                    </p>
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-sm text-gray-600">UPI ID: fibresnfools@upi</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(1)}
                  className="mt-6 text-gray-600 hover:text-gray-900"
                >
                  ← Back to Address
                </button>
              </div>

              {/* Order Summary */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FiPackage className="text-2xl text-[var(--primary)]" />
                  <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-800">
                    <span className="font-bold">Note:</span> After payment confirmation on WhatsApp, your order will be processed within 24 hours.
                  </p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary w-full mt-6"
                >
                  {paymentMethod === 'upi' ? 'Confirm UPI Payment' : 'Place Order'}
                </button>

                {paymentMethod === 'upi' && (
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        `Payment Confirmation for Order\n\n` +
                        `Total: ₹${total.toFixed(2)}\n` +
                        `Items: ${cart.length}\n` +
                        `Payment Method: UPI\n` +
                        `Please confirm payment details.`
                      )
                      window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
                    }}
                    className="w-full mt-4 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Confirm via WhatsApp
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 3 && isOrderPlaced && (
            <div className="card p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for your order! We've sent a confirmation to your email. Your order will be shipped within 2-3 business days.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">FNF-{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">5-7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping to:</span>
                    <span className="font-medium">{selectedAddress.address.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/orders" className="btn-primary">
                  View Your Orders
                </Link>
                <Link
                  href="/shop"
                  className="px-6 py-3 rounded-full border-2 border-gray-300 font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}