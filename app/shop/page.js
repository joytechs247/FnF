'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { FiFilter, FiGrid, FiList, FiChevronDown, FiX } from 'react-icons/fi'
import * as firestore from '@/lib/firestore'

export default function ShopPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('newest')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


//   const search = searchParams.get('search')
// if (search) {
//   filters.search = search
// }

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const filters = {}
      if (selectedCategories.length > 0) {
        filters.category = selectedCategories[0] // Firestore supports only one 'in' query
      }

      if (sortBy) {
        filters.sortBy = sortBy
      }

      const fetchedProducts = await firestore.getProducts(filters)
      setProducts(fetchedProducts)
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const fetchedCategories = await firestore.getCategories()
      setCategories(fetchedCategories)
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 5000])
    setSortBy('newest')
  }

  // Apply client-side filtering for price range and multiple categories
  const filteredProducts = products
    .filter(product => {
      if (selectedCategories.length > 0) {
        return selectedCategories.includes(product.category)
      }
      return true
    })
    .filter(product => {
      return product.price >= priceRange[0] && product.price <= priceRange[1]
    })

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Everything</h1>
          <p className="text-gray-600">
             • Your one-stop for quirky streetwear
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label
                      key={category.id}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <span className="text-gray-700 capitalize">
                          {category.name}
                        </span>
                      </div>
                    </label>

                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { id: 'newest', label: 'Newest First' },
                    { id: 'price-low', label: 'Price: Low to High' },
                    { id: 'price-high', label: 'Price: High to Low' },
                    { id: 'popular', label: 'Most Popular' },
                  ].map(option => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sort"
                        checked={sortBy === option.id}
                        onChange={() => {
                          setSortBy(option.id)
                          loadProducts()
                        }}
                        className="w-4 h-4 border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* View Controls */}
            {/* <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FiGrid className="text-xl" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FiList className="text-xl" />
                </button>
              </div>

              <div className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div> */}

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={`${viewMode === 'grid' ? '  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-6'}`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}