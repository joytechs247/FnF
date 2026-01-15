// 'use client'

// import { motion } from 'framer-motion'
// import Link from 'next/link'

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 py-20 md:py-32">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
//               Wear the <span className="text-[var(--primary)]">Fun</span>,
//               <br />Feel the <span className="text-[var(--secondary)]">Fibres</span>!
//             </h1>
//             <p className="text-lg text-gray-600 mb-8">
//               Quirky streetwear that doesn't take itself too seriously. Perfect for the Gen-Z who loves to stand out and laugh out loud.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link href="/shop" className="btn-primary">
//                 Shop the Vibe →
//               </Link>
//               <Link href="/categories" className="px-6 py-3 rounded-full border-2 border-gray-300 font-semibold hover:border-[var(--primary)] transition-colors">
//                 Explore Collections
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative w-full h-96 md:h-[500px]">
//               {/* Animated yarn balls */}
//               <div className="absolute top-0 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce"></div>
//               <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
//               <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-spin"></div>

//               {/* Hero image placeholder */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-3xl shadow-2xl flex items-center justify-center">
//                 <div className="text-center text-white p-8">
//                   <div className="text-6xl mb-4">👕🎨</div>
//                   <p className="text-xl font-bold">Your Style, Your Story</p>
//                   <p className="text-sm opacity-90">Limited Edition Drops Every Friday!</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }





// 'use client'

// import { motion } from 'framer-motion'
// import Link from 'next/link'

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 py-20 md:py-32">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full mb-6">
//               <span className="text-sm font-semibold text-gray-800">
//                 🔥 New Drops Every Friday | Limited Stock
//               </span>
//             </div>

//             <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
//               Wear the <span className="text-[var(--primary)]">Fun</span>,<br />
//               Feel the <span className="text-[var(--secondary)]">Fibres</span>
//             </h1>

//             <p className="text-lg text-gray-600 mb-10 max-w-xl">
//               Playful streetwear made for bold personalities. Oversized fits,
//               premium fabrics, and unapologetic vibes.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Link href="/shop" className="btn-primary">
//                 Shop New Drops →
//               </Link>
//               <Link
//                 href="/categories"
//                 className="px-6 py-3 rounded-full border-2 border-gray-300 font-semibold hover:border-[var(--primary)] transition-colors"
//               >
//                 Explore Styles
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
//               <div className="text-center text-white px-8">
//                 <div className="text-6xl mb-4">👕🔥</div>
//                 <p className="text-2xl font-bold">Streetwear With Personality</p>
//                 <p className="text-sm opacity-90 mt-2">
//                   Limited drops • No restocks
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }








'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/landing-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

      <div className="relative container mx-auto px-4 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE — LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-2 md:order-1 flex justify-center md:justify-start"
          >
            <div
              className="
                w-full
                max-w-[360px]
                sm:max-w-[420px]
                md:max-w-[460px]
                lg:max-w-[520px]
                aspect-[5/4]
                rounded-3xl
                overflow-hidden
                shadow-2xl
              "
            >
              <img
                src="/landing-image.gif"
                alt="FibresNFools Streetwear"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* TEXT — RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2  px-4 py-2 rounded-full mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
                🎁 Free Gifts on All Orders
              </span>



            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Wear the <span className="text-[var(--primary)]">Fun</span>,<br />
              Feel the <span className="text-[var(--secondary)]">Fibres</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl">
              Playful streetwear made for bold personalities. Oversized fits,
              premium fabrics, and unapologetic vibes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary">
                Shop New Drops →
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 rounded-full border-2 border-gray-300 font-semibold hover:border-[var(--primary)] transition-colors"
              >
                Explore Styles
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
