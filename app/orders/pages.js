'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import * as firestore from '@/lib/firestore'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      loadUserOrders()
    }
  }, [user])

  const loadUserOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const userOrders = await firestore.getUserOrders(user.uid)
      setOrders(userOrders)
    } catch (err) {
      console.error('Error loading orders:', err)
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FiCheckCircle className="text-green-500" />
      case 'shipped': return <FiTruck className="text-blue-500" />
      case 'pending': return <FiClock className="text-yellow-500" />
      default: return <FiPackage />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading orders...</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage all your orders in one place</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {orders.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="text-6xl mb-6">📦</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">
                  Start shopping to see your orders here
                </p>
                <a href="/shop" className="btn-primary">
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => {
                  // Convert Firestore timestamp to date
                  const orderDate = order.createdAt?.toDate 
                    ? new Date(order.createdAt.toDate()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    : 'Recently'

                  return (
                    <div key={order.id} className="card p-6">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600">Placed on {orderDate}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{order.total?.toFixed(2) || '0.00'}</p>
                          <p className="text-sm text-gray-600">{order.items?.length || 0} item(s)</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.items?.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                  <div className="text-xl">👕</div>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-medium text-gray-900">
                              {order.status === 'delivered' ? 'Delivered' :
                               order.status === 'shipped' ? 'Shipped' :
                               'Processing - Will ship soon'}
                            </p>
                            {order.trackingNumber && (
                              <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors">
                              Rate & Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Order Status Legend */}
            <div className="mt-12 card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status Guide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FiClock className="text-blue-500" />
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-gray-600">Preparing your order</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FiTruck className="text-blue-500" />
                  <div>
                    <p className="font-medium">Shipped</p>
                    <p className="text-sm text-gray-600">On the way to you</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <FiCheckCircle className="text-green-500" />
                  <div>
                    <p className="font-medium">Delivered</p>
                    <p className="text-sm text-gray-600">Successfully delivered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <FiPackage className="text-yellow-500" />
                  <div>
                    <p className="font-medium">Cancelled</p>
                    <p className="text-sm text-gray-600">Order was cancelled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}