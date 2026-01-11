'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { FiMapPin, FiPackage, FiCreditCard, FiCheck, FiArrowRight, FiEdit2 } from 'react-icons/fi'
import Link from 'next/link'
import * as firestore from '@/lib/firestore'
import { serverTimestamp } from 'firebase/firestore'

export default function CheckoutPage() {

  const [showUpiModal, setShowUpiModal] = useState(false)
  const [showWhatsappModal, setShowWhatsappModal] = useState(false)

  const { cart, getCartTotal, clearCart, syncGuestCartToUser } = useCart()
  const { user, userProfile, addAddress } = useAuth()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  })
  const [loading, setLoading] = useState(true)
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    if (user) {
      loadUserAddresses()
    } else {
      setLoading(false)
    }
  }, [user])



  const loadUserAddresses = async () => {
    try {
      const userAddresses = await firestore.getUserAddresses(user.uid)
      setAddresses(userAddresses)
      if (userAddresses.length > 0) {
        setSelectedAddress(userAddresses[0])
      }
    } catch (error) {
      console.error('Error loading addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const cartTotal = getCartTotal()
  const shipping = cartTotal > 499 ? 0 : 99
  const total = cartTotal + shipping

  const handleAddAddress = async () => {
    if (!user) return

    try {
      const address = await addAddress(newAddress)
      setAddresses([...addresses, address])
      setSelectedAddress(address)
      setNewAddress({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
      })
    } catch (error) {
      console.error('Error adding address:', error)
      alert('Failed to add address. Please try again.')
    }
  }

  const placeFinalOrder = async (paymentMethodUsed) => {
    if (!user || cart.length === 0 || !selectedAddress) return

    try {
      setLoading(true)

      const now = new Date().toISOString()

      const order = {
        userId: user.uid,
        address: `${selectedAddress.address}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
        createdAt: now,
        date: now,
        items: cart.map(item => ({
          image: item.productImage,
          name: item.productName,
          price: item.price,
          quantity: item.quantity
        })),
        paymentMethod: paymentMethodUsed,
        status: 'processing',
        total,
        trackingLink: ''
      }

      const createdOrder = await firestore.createOrder(order)

      setOrderId(createdOrder.id)
      await clearCart()

      setIsOrderPlaced(true)
      setStep(3)

    } catch (err) {
      console.error(err)
      alert('Failed to place order')
    } finally {
      setLoading(false)
      setShowUpiModal(false)
      setShowWhatsappModal(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading checkout...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!loading && cart.length === 0 && !isOrderPlaced) {
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-200 text-gray-600'
                  }`}>
                  {step > stepNumber ? <FiCheck /> : stepNumber}
                </div>
                <span className={`text-sm font-medium ${step >= stepNumber ? 'text-gray-900' : 'text-gray-600'
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
                    className={`block p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--primary)] transition-colors ${selectedAddress?.id === address.id
                      ? 'border-[var(--primary)] bg-blue-50'
                      : 'border-gray-200'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?.id === address.id}
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

                        </div>
                        <p className="text-gray-600 mt-2">{address.address}</p>
                        <p className="text-gray-600 mt-1">{address.city}, {address.state} - {address.pincode}</p>
                        <p className="text-gray-600 mt-1">{address.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Add New Address */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Add New Address</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Address Line"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="input-field md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Landmark (Optional)"
                    value={newAddress.landmark}
                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                    className="input-field"
                  />
                </div>
                <button
                  onClick={handleAddAddress}
                  disabled={!newAddress.name || !newAddress.phone || !newAddress.address}
                  className="w-full p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add New Address
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!selectedAddress}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {
                      id: 'upi',
                      name: 'UPI',
                      icon: '📱',
                      description: 'Pay using UPI (QR / UPI ID)',
                    },
                    {
                      id: 'whatsapp',
                      name: 'WhatsApp',
                      icon: '💬',
                      description: 'Order via WhatsApp chat',
                    },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--primary)] transition-colors ${paymentMethod === method.id
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
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.productName}</p>
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

                {paymentMethod === 'upi' && (
                  <button
                    onClick={() => setShowUpiModal(true)}
                    className="btn-primary w-full mt-6"
                  >
                    Pay via UPI
                  </button>
                )}

                {paymentMethod === 'whatsapp' && (
                  <button
                    onClick={() => setShowWhatsappModal(true)}
                    className="btn-primary w-full mt-6 bg-green-500 hover:bg-green-600"
                  >
                    Order via WhatsApp
                  </button>
                )}


                {/* {paymentMethod === 'upi' && (
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        `Payment Confirmation for Order #${orderId}\n\n` +
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
                )} */}
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
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">5-7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping to:</span>
                    <span className="font-medium">{selectedAddress?.city}</span>
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

      {showUpiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <h3 className="text-xl font-bold mb-4">UPI Payment</h3>

            <div className="w-48 h-48 bg-gray-100 mx-auto mb-4 flex items-center justify-center rounded-xl">
              QR IMAGE
            </div>

            <p className="font-semibold">UPI ID: fibresnfools@upi</p>
            <p className="mt-2">Amount: ₹{total.toFixed(2)}</p>

            <p className="text-sm text-gray-600 mt-4">
              Once payment is done, click below
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowUpiModal(false)}
                className="flex-1 border rounded-full py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => placeFinalOrder('upi')}
                className="flex-1 btn-primary"
              >
                I Have Paid
              </button>
            </div>
          </div>
        </div>
      )}


      {showWhatsappModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <h3 className="text-xl font-bold mb-4">WhatsApp Order</h3>

            <p className="text-gray-600 mb-6">
              You will be redirected to WhatsApp.
              After sending the message, come back and click below.
            </p>

            <button
              onClick={() => {
                const message = encodeURIComponent(
                  `Order Request\nTotal: ₹${total}\nItems: ${cart.length}`
                )
                window.open(`https://wa.me/919651743565?text=${message}`, '_blank')
              }}
              className="w-full bg-green-500 text-white py-3 rounded-full mb-4"
            >
              Redirect to WhatsApp
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => setShowWhatsappModal(false)}
                className="flex-1 border rounded-full py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => placeFinalOrder('whatsapp')}
                className="flex-1 btn-primary"
              >
                I Have Messaged
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}