'use client'

import { FiTruck, FiRefreshCw, FiStar, FiShield, FiPackage, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function TrustStrip() {
  const trustFeatures = [
    {
      icon: <FiTruck className="text-xl" />,
      text: "Free Shipping",
      subtext: "On orders over ₹499",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      emoji: "🚚",
      delay: 0.1
    },
    {
      icon: <FiRefreshCw className="text-xl" />,
      text: "Satisfaction Guaranteed",
      subtext: "Backed by Our Solid Guarantee",
      color: "text-green-500",
      bgColor: "bg-green-50",
      emoji: "🔄",
      delay: 0.2
    },
    {
      icon: <FiStar className="text-xl" />,
      text: "Rated 4.9/5",
      subtext: "By 10k+ customers",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      emoji: "⭐",
      delay: 0.3
    },
    {
      icon: <FiShield className="text-xl" />,
      text: "Premium Quality",
      subtext: "100% quality check",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      emoji: "🛡️",
      delay: 0.4
    }
  ]

  return (
    <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-cyan-50 border-y border-gray-200/50 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: feature.delay }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Main Card */}
              <div className={`${feature.bgColor} rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-2 md:gap-3 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                {/* Emoji & Icon */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{feature.emoji}</span>
                  {/* <div className={`p-2 rounded-full ${feature.color} ${feature.bgColor} border-2 border-white shadow-sm`}>
                    {feature.icon}
                  </div> */}
                </div>
                
                {/* Text Content */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    {feature.text}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {feature.subtext}
                  </p>
                </div>

                {/* Animated Dots */}
                <div className="flex gap-1 mt-1">
                  <div className={`w-1 h-1 rounded-full ${feature.color} animate-pulse`}></div>
                  <div className={`w-1 h-1 rounded-full ${feature.color} animate-pulse delay-100`}></div>
                  <div className={`w-1 h-1 rounded-full ${feature.color} animate-pulse delay-200`}></div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge - Mobile Only */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          viewport={{ once: true }}
          className="md:hidden mt-6"
        >
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <FiHeart className="animate-pulse" />
              <span className="text-sm font-medium">Trusted by 10,000+ Gen-Z Shoppers</span>
              <FiHeart className="animate-pulse delay-300" />
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Floating Trust Badge - Desktop Only */}
      {/* <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2"
      >
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-2 rounded-full shadow-xl">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping absolute"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full relative"></div>
            </div>
            <span className="text-xs font-medium">Trust & Quality</span>
          </div>
        </div>
      </motion.div> */}

      {/* Counter Animation */}
      {/* <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xs text-gray-600"
        >
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold">
              10K+
            </div>
            <span>Happy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              4.9
            </div>
            <span>Rating</span>
          </div>
        </motion.div>
      </div> */}
    </section>
  )
}