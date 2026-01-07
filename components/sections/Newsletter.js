//Newsletter.js

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiMail, FiGift, FiCheck } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // In a real app, connect to your email service here
      console.log('Subscribing email:', email)
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <FiGift className="text-white" />
              <span className="text-white text-sm font-medium">
                Exclusive Perks for Subscribers
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get 15% Off Your First Order!
            </h2>
            
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Plus, be the first to know about new drops, secret sales, and get style inspo delivered straight to your inbox. No spam, promise!
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-3 bg-white text-[var(--primary)] px-6 py-4 rounded-full"
              >
                <FiCheck className="text-xl" />
                <span className="font-semibold">You're in! Check your email for the discount code 🎉</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-grow">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-black transition-colors whitespace-nowrap"
                >
                  Get My Discount!
                </button>
              </form>
            )}

            <p className="text-white/70 text-sm mt-6">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                { text: 'First Access to Drops', emoji: '🚀' },
                { text: 'Members-Only Sales', emoji: '🔒' },
                { text: 'Style Guides & Tips', emoji: '💡' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-3 text-white">
                  <span className="text-2xl">{benefit.emoji}</span>
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}