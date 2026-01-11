// 'use client'

// import ProtectedRoute from '@/components/ProtectedRoute'
// import { useAuth } from '@/context/AuthContext'
// import Link from 'next/link'

// export default function OrdersPage() {
//     const { userProfile } = useAuth()
//     const orders = userProfile?.orders || []

//     return (
//         <ProtectedRoute>
//             <div className="container mx-auto px-4 py-8 max-w-5xl">
//                 <h1 className="text-3xl font-bold mb-6">My Orders</h1>

//                 {orders.length === 0 ? (
//                     <p className="text-gray-600">No orders yet.</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {orders.map((order) => (
//                             <Link
//                                 key={order.orderId}
//                                 href={`/orders/${order.orderId}`}
//                                 className="block card p-4 hover:bg-gray-50"
//                             >
//                                 <div className="flex items-center gap-4">
//                                     {order.image && (
//                                         <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
//                                             <img
//                                                 src={order.image}
//                                                 alt="Order item"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                     )}

//                                     <div>
//                                         <p className="font-semibold">Order #{order.orderId}</p>
//                                         <p className="text-sm text-gray-600">
//                                             {order.createdAt
//                                                 ? new Date(order.createdAt).toLocaleString()
//                                                 : ""}
//                                         </p>
//                                         {order.itemsCount && (
//                                             <p className="text-xs text-gray-500">
//                                                 {order.itemsCount} item(s)
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>

//                             </Link>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </ProtectedRoute>
//     )
// }








'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function OrdersPage() {
  const { userProfile } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userProfile?.orders) {
      setOrders(userProfile.orders)
    }
    setLoading(false)
  }, [userProfile])

  const getStatusIcon = (status = 'processing') => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />
      case 'shipped':
        return <FiTruck className="text-blue-500" />
      default:
        return <FiClock className="text-yellow-500" />
    }
  }

  const getStatusColor = (status = 'processing') => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'Recently'

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">Track and manage all your orders</p>
          </div>

          {orders.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-6xl mb-6">📦</div>
              <h3 className="text-2xl font-bold mb-2">No orders yet</h3>
              <Link href="/shop" className="btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.orderId}
                  href={`/orders/${order.orderId}`}
                  className="block card p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex gap-6">

                    {/* IMAGE */}
                    <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden">
                      {order.image ? (
                        <img
                          src={order.image}
                          alt="Order item"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                      )}
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            Order #{order.orderId.slice(0, 8)}
                          </h3>
                          <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold">₹{order.total}</p>
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t pt-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                        <FiArrowRight className="text-gray-400" />
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
