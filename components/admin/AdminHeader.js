'use client'

import { useAuth } from '@/context/AuthContext'
import { FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [notifications, setNotifications] = useState(3)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu & Search */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-700"
            >
              {showMobileMenu ? <FiX /> : <FiMenu />}
            </button>
            
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="pl-12 pr-4 py-2 bg-gray-100 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* Right: User & Notifications */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <FiBell className="text-xl text-gray-700" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-900">{user?.email?.split('@')[0] || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full pl-12 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t px-6 py-4 bg-white">
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Dashboard
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Products
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Orders
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Customers
            </button>
          </div>
        </div>
      )}
    </header>
  )
}