'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { FiFilter, FiGrid, FiList, FiChevronDown, FiX, FiArrowLeft, FiTag } from 'react-icons/fi'
import * as firestore from '@/lib/firestore'

export default function CategoryPage() {
  const params = useParams()
  const categoryName = params.category
  
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('newest')
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (categoryName) {
      loadCategory()
      loadProducts()
    }
  }, [categoryName])

  const loadCategory = async () => {
    try {
      const categories = await firestore.getCategories()
      const foundCategory = categories.find(cat => 
        cat.name === categoryName || cat.id === categoryName
      )
      
      if (foundCategory) {
        setCategory(foundCategory)
      } else {
        // Fallback category data
        const fallbackCategories = {
          'tshirts': { name: 'T-Shirts', displayName: 'T-Shirts', description: 'Quirky tees with attitude', emoji: '👕', color: 'from-pink-400 to-rose-400' },
          'hoodies': { name: 'Hoodies', displayName: 'Hoodies', description: 'Cozy & statement pieces', emoji: '🧥', color: 'from-blue-400 to-cyan-400' },
          'oversized': { name: 'Oversized', displayName: 'Oversized', description: 'Comfy oversized fits', emoji: '📏', color: 'from-purple-400 to-pink-400' },
          'sweatshirts': { name: 'Sweatshirts', displayName: 'Sweatshirts', description: 'Pullovers & crewnecks', emoji: '🧶', color: 'from-amber-400 to-orange-400' },
          'accessories': { name: 'Accessories', displayName: 'Accessories', description: 'Hats, socks & more', emoji: '🧢', color: 'from-emerald-400 to-green-400' },
          'limited': { name: 'limited', displayName: 'Limited Edition', description: 'Weekly exclusive drops', emoji: '✨', color: 'from-red-400 to-pink-400' },
        }
        
        const fallback = fallbackCategories[categoryName] || {
          name: categoryName,
          displayName: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
          description: 'Explore our amazing collection',
          emoji: '🛍️',
          color: 'from-gray-400 to-gray-600'
        }
        
        setCategory(fallback)
      }
    } catch (error) {
      console.error('Error loading category:', error)
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const filters = {
        category: categoryName,
        sortBy
      }
      
      const fetchedProducts = await firestore.getProducts(filters)
      
      // Apply client-side price filtering
      const filteredProducts = fetchedProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      
      setProducts(filteredProducts)
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSortBy('newest')
  }

  const getCategoryColor = () => {
    const colors = {
      'tshirts': 'bg-gradient-to-r from-pink-400 to-rose-400',
      'hoodies': 'bg-gradient-to-r from-blue-400 to-cyan-400',
      'oversized': 'bg-gradient-to-r from-purple-400 to-pink-400',
      'sweatshirts': 'bg-gradient-to-r from-amber-400 to-orange-400',
      'accessories': 'bg-gradient-to-r from-emerald-400 to-green-400',
      'limited': 'bg-gradient-to-r from-red-400 to-pink-400',
    }
    return colors[categoryName] || 'bg-gradient-to-r from-gray-400 to-gray-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading category...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/categories" className="btn-primary inline-block">
            Browse All Categories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      {/* Category Header */}
      <div className={`py-12 ${getCategoryColor()} text-white`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                {/* <div className="text-4xl">{category.emoji || '🛍️'}</div> */}
                <h1 className="text-4xl md:text-5xl font-bold">
                  {category.displayName || category.name}
                </h1>
              </div>
              <p className="text-lg opacity-90 max-w-2xl">
                {category.description || 'Explore our amazing collection'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/categories"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <FiArrowLeft />
                All Categories
              </Link>
              {/* <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">{products.length}</span> Products
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold"
          >
            <FiFilter />
            Filters & Sorting
          </button>

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

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                      loadProducts()
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--primary)]"
                  />
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

              {/* Category Info */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <FiTag className="text-gray-500" />
                  <h3 className="font-semibold text-gray-900">About This Category</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Discover our curated collection of {category.displayName?.toLowerCase() || category.name}. 
                  Each piece is designed with quality and style in mind.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              {/* <div className="flex items-center gap-4">
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
              </div> */}

              {/* <div className="text-gray-600">
                Showing {products.length} products
              </div> */}
            </div>

            {/* Products Grid/List */}
            {products.length > 0 ? (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
                {products.map(product => (
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
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or check back later for new arrivals
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    href="/shop"
                    className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            )}

            {/* Category Tips */}
            <div className="mt-12 card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Shopping Tips for {category.displayName}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                  <div className="text-2xl mb-2">📏</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Size Guide</h4>
                  <p className="text-sm text-gray-600">
                    Check our size chart for the perfect fit. Most items are true to size.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <div className="text-2xl mb-2">🧼</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Care Instructions</h4>
                  <p className="text-sm text-gray-600">
                    Machine wash cold, gentle cycle. Tumble dry low or air dry.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-2xl mb-2">🚚</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
                  <p className="text-sm text-gray-600">
                    Free shipping on orders over ₹1499. Easy returns within 7 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Categories */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Explore More Categories</h3>
              <div className="flex flex-wrap gap-3">
                {['tshirts', 'hoodies', 'sweatshirts', 'accessories'].map(cat => {
                  if (cat === categoryName) return null
                  
                  const categoryNames = {
                    'tshirts': 'T-Shirts',
                    'hoodies': 'Hoodies',
                    'sweatshirts': 'Sweatshirts',
                    'accessories': 'Accessories',
                    'oversized': 'Oversized',
                    'limited': 'Limited Edition'
                  }
                  
                  return (
                    <Link
                      key={cat}
                      href={`/categories/${cat}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {categoryNames[cat] || cat}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}