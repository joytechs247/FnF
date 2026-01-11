//Testimonials.js

'use client'

import { motion } from 'framer-motion'
import { FiStar, FiQuote, FiMessageSquare } from 'react-icons/fi'
import { useState } from 'react'

const testimonials = [
  {
    name: 'Aarav S.',
    handle: '@aaravstyles',
    role: 'Content Creator',
    content: "These tees get me compliments EVERY. SINGLE. TIME. The quality is insane and the designs are actually funny, not cringe!",
    rating: 5,
    avatar: '👨‍🎤'
  },
  {
    name: 'Priya M.',
    handle: '@priyamemequeen',
    role: 'College Student',
    content: "Finally found oversized tees that don't lose shape after one wash! The Monday Vibes tee is literally my personality.",
    rating: 5,
    avatar: '👩‍🎓'
  },
  {
    name: 'Rohan K.',
    handle: '@rohan.designs',
    role: 'UI/UX Designer',
    content: "The hoodie fabric is next level. Wore it for a week straight (don't judge me) and it still looks fresh. Will cop more colors!",
    rating: 5,
    avatar: '👨‍💻'
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-[var(--primary)]">Fools</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our community of stylish, savvy shoppers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 relative"
            >
              <FiMessageSquare className="absolute top-6 right-6 text-gray-200 text-3xl" />
              
              {/* Stars */}
              <div className="flex text-[var(--accent)] mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.handle}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 mb-4">
            Join the conversation on social media
          </p>
          <div className="inline-flex items-center gap-6 bg-white px-8 py-4 rounded-full shadow-lg">
            <span className="text-gray-600">#FibresNFools</span>
            <span className="text-gray-600">#WearTheFun</span>
            <span className="text-gray-600">#FNFVibes</span>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}