'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Total Revenue', value: '₹1,24,899', change: '+12.5%', icon: '💰' },
    { label: 'Total Orders', value: '1,248', change: '+8.2%', icon: '📦' },
    { label: 'Active Users', value: '10.2K', change: '+15.3%', icon: '👥' },
    { label: 'Conversion Rate', value: '3.8%', change: '+2.1%', icon: '📈' },
  ]

  const recentOrders = [
    { id: 'FNF-12350', customer: 'Alex Johnson', amount: '₹2,599', status: 'Delivered', date: 'Today' },
    { id: 'FNF-12349', customer: 'Priya Sharma', amount: '₹1,299', status: 'Processing', date: 'Today' },
    { id: 'FNF-12348', customer: 'Rohan Kumar', amount: '₹3,898', status: 'Shipped', date: 'Yesterday' },
    { id: 'FNF-12347', customer: 'Sanya Verma', amount: '₹699', status: 'Delivered', date: 'Yesterday' },
    { id: 'FNF-12346', customer: 'Mike Chen', amount: '₹1,899', status: 'Pending', date: '2 days ago' },
  ]

  const topProducts = [
    { name: 'Code & Coffee Hoodie', sales: 142, revenue: '₹3,69,258', trend: '📈' },
    { name: 'Monday Vibes Tee', sales: 128, revenue: '₹1,66,272', trend: '📈' },
    { name: 'Sarcasm Level: Expert', sales: 89, revenue: '₹1,33,411', trend: '📈' },
    { name: 'Yarn Dreams Sweatshirt', sales: 76, revenue: '₹1,51,924', trend: '📈' },
    { name: 'Weekend Mode Tee', sales: 64, revenue: '₹76,736', trend: '📈' },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1 p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className="text-2xl">{stat.icon}</div>
                  </div>
                  <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </div>
                </div>
              ))}
            </div>

            {/* Charts & Tables */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Recent Orders */}
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                  <button className="text-[var(--primary)] hover:underline text-sm">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">
                            <span className="font-medium text-gray-900">{order.id}</span>
                            <div className="text-xs text-gray-500">{order.date}</div>
                          </td>
                          <td className="py-3">{order.customer}</td>
                          <td className="py-3 font-medium">{order.amount}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
                  <button className="text-[var(--primary)] hover:underline text-sm">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-sm">👕</div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{product.revenue}</p>
                        <div className="text-green-600 text-sm">{product.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="text-2xl mb-2">➕</div>
                  <div className="font-medium">Add Product</div>
                </button>
                <button className="p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium">View Reports</div>
                </button>
                <button className="p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-medium">Manage Orders</div>
                </button>
                <button className="p-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-medium">Customer Support</div>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}