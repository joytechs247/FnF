// 'use client'

// import Link from 'next/link'

// export default function LimitedDropBanner() {
//   return (
//     <section className="py-20 bg-gray-900 text-white">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-4xl font-extrabold mb-4">
//           LIMITED DROP 🚨
//         </h2>
//         <p className="mb-6 opacity-80">
//           Once it’s gone, it’s gone forever.
//         </p>
//         <Link
//           href="/shop"
//           className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold"
//         >
//           Explore Drop →
//         </Link>
//       </div>
//     </section>
//   )
// }





'use client'

import Link from 'next/link'

export default function LimitedDropBanner() {
  return (
    <section
      className="relative py-20 text-white overflow-hidden"
      style={{
        backgroundImage: "url('/limit-drop-bg.png')", // 🔁 replace with your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gray-900/70" />

      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          Built to stand out. Made to vanish
        </h2>
        <p className="mb-6 opacity-80">
          Blink and it's gone - limited quantities, zero restocks, all attitude.
        </p>
        <Link
          href="/shop"
          className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold"
        >
          Explore Drop →
        </Link>
      </div>
    </section>
  )
}
