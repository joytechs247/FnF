'use client'

import Link from 'next/link'

export default function MidLifestyleBanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto px-4">
        <div
          className="
            relative
            rounded-3xl
            text-white
            flex
            items-center
            aspect-[1/1]
            md:aspect-auto
            min-h-[420px]
            md:min-h-[520px]
            lg:min-h-[580px]
            p-6
            sm:p-8
            md:p-12
            overflow-hidden
          "
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/df90yqmzu/image/upload/v1768329858/trending-now-banner_o9ajuf.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-xl">
            {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Streetwear That Speaks Your Mood 😎
            </h2> */}

            {/* <p className="mb-6 opacity-90 text-sm sm:text-base">
              Oversized fits, unfiltered humor, and fabrics you’ll never want to
              take off.
            </p> */}

            <Link
              href="/categories/best-sellers"
              className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Shop Oversized →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
