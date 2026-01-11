'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiGrid, FiArrowRight } from 'react-icons/fi'
import * as firestore from '@/lib/firestore'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
    loadFeaturedProducts()
  }, [])

  const loadCategories = async () => {
    try {
      const fetchedCategories = await firestore.getCategories()
      // Add fallback categories if none exist
      if (fetchedCategories.length === 0) {
        setCategories([
          { id: 'tshirts', name: 'T-Shirts', displayName: 'T-Shirts', productCount: 42, emoji: '👕', color: 'from-pink-400 to-rose-400' },
          { id: 'hoodies', name: 'Hoodies', displayName: 'Hoodies', productCount: 18, emoji: '🧥', color: 'from-blue-400 to-cyan-400' },
          { id: 'oversized', name: 'Oversized', displayName: 'Oversized', productCount: 24, emoji: '📏', color: 'from-purple-400 to-pink-400' },
          { id: 'sweatshirts', name: 'Sweatshirts', displayName: 'Sweatshirts', productCount: 16, emoji: '🧶', color: 'from-amber-400 to-orange-400' },
          { id: 'accessories', name: 'Accessories', displayName: 'Accessories', productCount: 32, emoji: '🧢', color: 'from-emerald-400 to-green-400' },
          { id: 'limited', name: 'limited', displayName: 'Limited Edition', productCount: 8, emoji: '✨', color: 'from-red-400 to-pink-400' },
        ])
      } else {
        setCategories(fetchedCategories.map(cat => ({
          ...cat,
          color: getCategoryColor(cat.name)
        })))
      }
    } catch (error) {
      console.error('Error loading categories:', error)
      // Fallback categories
      setCategories([
        { id: 'tshirts', name: 'T-Shirts', displayName: 'T-Shirts', productCount: 42, emoji: '👕', color: 'from-pink-400 to-rose-400' },
        { id: 'hoodies', name: 'Hoodies', displayName: 'Hoodies', productCount: 18, emoji: '🧥', color: 'from-blue-400 to-cyan-400' },
        { id: 'oversized', name: 'Oversized', displayName: 'Oversized', productCount: 24, emoji: '📏', color: 'from-purple-400 to-pink-400' },
        { id: 'sweatshirts', name: 'Sweatshirts', displayName: 'Sweatshirts', productCount: 16, emoji: '🧶', color: 'from-amber-400 to-orange-400' },
        { id: 'accessories', name: 'Accessories', displayName: 'Accessories', productCount: 32, emoji: '🧢', color: 'from-emerald-400 to-green-400' },
        { id: 'limited', name: 'limited', displayName: 'Limited Edition', productCount: 8, emoji: '✨', color: 'from-red-400 to-pink-400' },
      ])
    }
  }

  const loadFeaturedProducts = async () => {
    try {
      const products = await firestore.getProducts({ isFeatured: true, limit: 8 })
      setFeaturedProducts(products)
    } catch (error) {
      console.error('Error loading featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (categoryName) => {
    const colors = {
      'tshirts': 'from-pink-400 to-rose-400',
      'hoodies': 'from-blue-400 to-cyan-400',
      'oversized': 'from-purple-400 to-pink-400',
      'sweatshirts': 'from-amber-400 to-orange-400',
      'accessories': 'from-emerald-400 to-green-400',
      'limited': 'from-red-400 to-pink-400',
      't-shirts': 'from-pink-400 to-rose-400',
      'hoodie': 'from-blue-400 to-cyan-400',
    }
    return colors[categoryName?.toLowerCase()] || 'from-gray-400 to-gray-600'
  }

  const getCategoryEmoji = (categoryName) => {
    const emojis = {
      'tshirts': '👕',
      'hoodies': '🧥',
      'oversized': '📏',
      'sweatshirts': '🧶',
      'accessories': '🧢',
      'limited': '✨',
      't-shirts': '👕',
      'hoodie': '🧥',
    }
    return emojis[categoryName?.toLowerCase()] || '🛍️'
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore by <span className="text-[var(--primary)]">Category</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find your perfect vibe from our carefully curated collections. Each category has its own personality!
          </p>
          {/* <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
            <FiGrid className="text-[var(--primary)]" />
            <span className="font-semibold">{categories.length} Categories</span>
          </div> */}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`/categories/${category.name}`}
                  className="card block h-full p-8 hover:scale-[1.02] transition-transform group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-3xl`}>
                      {category.emoji || getCategoryEmoji(category.name)}
                    </div>
                    {/* <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {category.productCount || 0} items
                    </span> */}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {category.displayName || category.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover unique designs and styles in this collection
                  </p>
                  
                  <div className="flex items-center text-[var(--primary)] font-medium group-hover:translate-x-2 transition-transform">
                    Explore Collection
                    <FiArrowRight className="ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured <span className="text-[var(--primary)]">Products</span>
              </h2>
              <p className="text-gray-600">Popular picks from all categories</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map(product => (
                <div key={product.id} className="card p-4">
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <div className="text-4xl">{product.emoji || '👕'}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[var(--primary)] font-bold">₹{product.price}</p>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                View All Products
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Category Stats */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Shop by Category?
              </h2>
              <p className="text-gray-600">
                Find exactly what you're looking for with our organized collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-gray-900 mb-2">Targeted Selection</h3>
                <p className="text-gray-600">
                  Browse only what interests you without the clutter
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-bold text-gray-900 mb-2">Curated Styles</h3>
                <p className="text-gray-600">
                  Each category is carefully curated for the best experience
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">Quick Discovery</h3>
                <p className="text-gray-600">
                  Find your perfect style faster with organized categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}