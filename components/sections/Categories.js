//Categories.js
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const categories = [
  {
    id: 'tshirts',
    name: 'T-Shirts',
    description: 'Quotes, memes & vibes',
    color: 'from-pink-400 to-rose-400',
    emoji: '👕',
    count: '42 designs'
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    description: 'Cozy & statement pieces',
    color: 'from-blue-400 to-cyan-400',
    emoji: '🧥',
    count: '18 designs'
  },
  {
    id: 'oversized',
    name: 'Oversized',
    description: 'Comfy oversized fits',
    color: 'from-purple-400 to-pink-400',
    emoji: '📏',
    count: '24 designs'
  },
  {
    id: 'sweatshirts',
    name: 'Sweatshirts',
    description: 'Pullovers & crewnecks',
    color: 'from-amber-400 to-orange-400',
    emoji: '🧶',
    count: '16 designs'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Hats, socks & more',
    color: 'from-emerald-400 to-green-400',
    emoji: '🧢',
    count: '32 items'
  },
  {
    id: 'limited',
    name: 'Limited Edition',
    description: 'Weekly exclusive drops',
    color: 'from-red-400 to-pink-400',
    emoji: '✨',
    count: '8 designs'
  },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-[var(--secondary)]">Vibe</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect fit from our carefully curated collections. Each category has its own personality!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/shop?category=${category.id}`}
                className="card block h-full p-6 hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}>
                    {category.emoji}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center text-[var(--primary)] font-medium">
                  Explore
                  <FiArrowRight className="ml-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 btn-primary"
          >
            Explore All Collections
            <FiArrowRight className="animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}