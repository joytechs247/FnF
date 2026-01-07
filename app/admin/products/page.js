'use client'

import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'

export default function AdminProductsPage() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Code & Coffee Hoodie',
      category: 'Hoodies',
      price: 2599,
      stock: 42,
      status: 'Active',
      sales: 142
    },
    {
      id: 2,
      name: 'Monday Vibes Tee',
      category: 'T-Shirts',
      price: 1299,
      stock: 89,
      status: 'Active',
      sales: 128
    },
    {
      id: 3,
      name: 'Sarcasm Level: Expert',
      category: 'Oversized',
      price: 1499,
      stock: 0,
      status: 'Out of Stock',
      sales: 89
    },
    {
      id: 4,
      name: 'Yarn Dreams Sweatshirt',
      category: 'Sweatshirts',
      price: 1999,
      stock: 24,
      status: 'Active',
      sales: 76
    },
  ])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600">Manage your product catalog</p>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <FiPlus />
                Add Product
              </button>
            </div>

            {/* Filters */}
            <div className="card p-6 mb-6">
              <div className="flex flex-wrap gap-4">
                <select className="input-field">
                  <option>All Categories</option>
                  <option>T-Shirts</option>
                  <option>Hoodies</option>
                  <option>Sweatshirts</option>
                  <option>Oversized</option>
                </select>
                <select className="input-field">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Out of Stock</option>
                  <option>Draft</option>
                </select>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field"
                />
                <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors">
                  Filter
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Price</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Stock</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Sales</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <div className="text-lg">👕</div>
                            </div>
                            <span className="font-medium text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{product.category}</td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-gray-900">₹{product.price}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-medium ${
                            product.stock < 10 ? 'text-red-600' : 'text-gray-700'
                          }`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            product.status === 'Active' ? 'bg-green-100 text-green-800' :
                            product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">{product.sales}</div>
                          <div className="text-sm text-gray-500">units sold</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <FiEye />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                              <FiEdit2 />
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center p-6 border-t">
                <div className="text-sm text-gray-600">
                  Showing 1-4 of {products.length} products
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}