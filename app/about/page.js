'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'





export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-pink-50">

      {/* HERO */}
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
        >
          About <span className="text-[var(--primary)]">Fibres</span>
          <span className="text-[var(--secondary)]">NFools</span>
        </motion.h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          We don’t just make clothes — we craft personalities you can wear.
        </p>
      </section>

      {/* STORY */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4">
              FibresNFools was born from a simple belief — fashion should be
              fearless, playful, and unapologetically expressive.
            </p>
            <p className="text-gray-700 mb-4">
              In a world of copy-paste trends, we wanted to create something
              different. Streetwear that feels premium yet fun. Clothing that
              makes people smile, turn heads, and feel confident.
            </p>
            <p className="text-gray-700">
              Every piece we design blends comfort, quality fabrics, and bold
              character — because boring clothes were never our thing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-4">What Makes Us Different?</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✨ Limited edition drops — no mass production</li>
              <li>🧵 Premium fabrics with oversized comfort</li>
              <li>🎨 Playful designs with bold personality</li>
              <li>🚀 Made for street culture & modern creators</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Creativity First',
                desc: 'We design without limits. No trends, no rules.',
                icon: '🎨',
              },
              {
                title: 'Quality Over Quantity',
                desc: 'Premium materials that last beyond seasons.',
                icon: '🧵',
              },
              {
                title: 'Community Driven',
                desc: 'Built with love for our growing FnF family.',
                icon: '🤝',
              },
              {
                title: 'Fearless Fun',
                desc: 'If it doesn’t feel fun, it doesn’t ship.',
                icon: '🔥',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FNf */}
      <section className="container mx-auto px-4 py-24 max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-6">
          Why People Love FibresNFools
        </h2>
        <p className="text-gray-700 mb-10">
          Because we’re not here to blend in. We’re here to stand out — with you.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6">
            <h4 className="font-semibold mb-2">Limited Drops</h4>
            <p className="text-sm text-gray-600">
              Once sold out, it’s gone forever.
            </p>
          </div>
          <div className="card p-6">
            <h4 className="font-semibold mb-2">Oversized Comfort</h4>
            <p className="text-sm text-gray-600">
              Relaxed fits designed for all-day wear.
            </p>
          </div>
          <div className="card p-6">
            <h4 className="font-semibold mb-2">Premium Finish</h4>
            <p className="text-sm text-gray-600">
              From stitching to print quality — details matter.
            </p>
          </div>
          <div className="card p-6">
            <h4 className="font-semibold mb-2">Built for Expression</h4>
            <p className="text-sm text-gray-600">
              Your outfit should say something before you do.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Wear the Fun?
        </h2>
        <p className="mb-8 opacity-80">
          Discover limited drops crafted for bold personalities.
        </p>

        <Link
          href="/shop"
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Explore Collection →
        </Link>
      </section>

    </div>
  )
}
