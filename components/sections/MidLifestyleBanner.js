'use client'

import Link from 'next/link'

export default function MidLifestyleBanner() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-500 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Streetwear That Speaks Your Mood 😎
          </h2>
          <p className="max-w-xl mb-6 opacity-90">
            Oversized fits, unfiltered humor, and fabrics you’ll never want to
            take off.
          </p>
          <Link
            href="/categories/oversized"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            Shop Oversized →
          </Link>
        </div>
      </div>
    </section>
  )
}
