//FeatureProducts.js

'use client'

import ProductCard from '@/components/ProductCard'
import { FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

const sampleProducts = [
  {
    id: '1',
    name: 'Monday Vibes Tee',
    category: 'T-Shirt',
    price: 1299,
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    emoji: '😴'
  },
  {
    id: '2',
    name: 'Code & Coffee Hoodie',
    category: 'Hoodie',
    price: 2599,
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    emoji: '👨‍💻'
  },
  {
    id: '3',
    name: 'Yarn Dreams Sweatshirt',
    category: 'Sweatshirt',
    price: 1999,
    sizes: ['S', 'M', 'L'],
    isNew: false,
    emoji: '🧶'
  },
  {
    id: '4',
    name: 'Sarcasm Level: Expert',
    category: 'Oversized Tee',
    price: 1499,
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    emoji: '😏'
  },
]

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'bestsellers', label: 'Bestsellers' },
    { id: 'sale', label: 'On Sale' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured <span className="text-[var(--primary)]">Favorites</span>
            </h2>
            <p className="text-gray-600">Handpicked by our community of trendsetters</p>
          </div>
          <Link 
            href="/shop" 
            className="flex items-center gap-2 text-[var(--primary)] font-semibold mt-4 md:mt-0"
          >
            View All Products <FiArrowRight />
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            Load More Styles
            <FiArrowRight className="animate-pulse" />
          </Link>
        </div>
      </div>
    </section>
  )
}