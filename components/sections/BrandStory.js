//BrandStory.js

'use client'

import { motion } from 'framer-motion'
import { FiCheckCircle, FiSmile, FiTrendingUp, FiUsers } from 'react-icons/fi'

const features = [
  {
    icon: <FiCheckCircle className="text-3xl" />,
    title: "Quality You Can Feel",
    description: "Premium fabrics that don't just look good, but feel amazing too. We test every thread!",
    color: "text-[var(--secondary)]"
  },
  {
    icon: <FiSmile className="text-3xl" />,
    title: "Designed to Make You Smile",
    description: "Our designs come with a side of humor. Because fashion should be fun, not serious!",
    color: "text-[var(--primary)]"
  },
  {
    icon: <FiTrendingUp className="text-3xl" />,
    title: "Trendsetting, Not Trend-Following",
    description: "We create trends, not chase them. Be the first to rock styles everyone will want tomorrow.",
    color: "text-[var(--accent)]"
  },
  {
    icon: <FiUsers className="text-3xl" />,
    title: "By Gen-Z, For Gen-Z",
    description: "Our design team is 100% Gen-Z. We get what you want because we want it too!",
    color: "text-purple-500"
  },
]

export default function BrandStory() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why <span className="text-[var(--primary)]">Fibres</span> &{' '}
              <span className="text-[var(--secondary)]">Fools</span>?
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                We started with a simple idea: fashion should be fun, comfortable, and uniquely you. No boring basics, no following trends—just authentic expression.
              </p>
              
              <p className="text-gray-600">
                What makes us different? We're not just selling clothes; we're creating a community. Each design tells a story, each thread carries laughter, and every piece is made with love (and a little bit of mischief).
              </p>
              
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold">Join 10,000+ Happy Fools</p>
                  <p className="text-sm text-gray-500">Already rocking our vibe</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className={`mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: 'Happy Customers', value: '10K+', emoji: '😊' },
            { label: 'Unique Designs', value: '200+', emoji: '🎨' },
            { label: 'Cities Delivered', value: '50+', emoji: '📍' },
            { label: 'Avg. Rating', value: '4.9★', emoji: '⭐' },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}