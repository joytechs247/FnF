'use client'

import Link from 'next/link'
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiBarChart2, 
  FiSettings, 
  FiShoppingBag,
  FiTruck,
  FiDollarSign,
  FiMessageSquare
} from 'react-icons/fi'

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'products', label: 'Products', icon: <FiPackage /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingBag /> },
    { id: 'customers', label: 'Customers', icon: <FiUsers /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 /> },
    { id: 'inventory', label: 'Inventory', icon: <FiTruck /> },
    { id: 'transactions', label: 'Transactions', icon: <FiDollarSign /> },
    { id: 'support', label: 'Support', icon: <FiMessageSquare /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden md:block">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full"></div>
        <div>
          <div className="font-bold text-gray-900">FibresNFools</div>
          <div className="text-xs text-gray-500">Admin Panel</div>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === item.id
                ? 'bg-[var(--primary)] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="mt-12 p-4 bg-gray-50 rounded-xl">
        <div className="text-sm font-medium text-gray-700 mb-3">Quick Stats</div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Today's Orders</span>
            <span className="font-medium">42</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pending Reviews</span>
            <span className="font-medium">18</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Low Stock</span>
            <span className="font-medium text-red-600">7 items</span>
          </div>
        </div>
      </div>

      {/* Back to Store */}
      <div className="mt-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back to Store
        </Link>
      </div>
    </aside>
  )
}