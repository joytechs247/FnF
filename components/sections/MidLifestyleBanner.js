// 'use client'
// import Link from 'next/link'
// export default function MidLifestyleBanner() {
//   return (
//     <section className="py-16 md:py-20">
//       <div className="mx-auto px-4">
//         <div
//           className="
//             relative
//             rounded-3xl
//             text-white
//             flex
//             items-center
//             aspect-[1/1]
//             md:aspect-auto
//             min-h-[420px]
//             md:min-h-[520px]
//             lg:min-h-[580px]
//             p-6
//             sm:p-8
//             md:p-12
//             overflow-hidden
//           "
//           style={{
//             backgroundImage:
//               "url('https://res.cloudinary.com/df90yqmzu/image/upload/v1768329858/trending-now-banner_o9ajuf.png')",
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div className="max-w-xl">
//             <Link
//               href="/categories/best-sellers"
//               className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
//             >
//               Shop Oversized →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }






'use client'
import Link from 'next/link'

export default function MidLifestyleBanner() {
  return (
    <section className="py-16 md:py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="
            relative
            w-full
            rounded-3xl
            text-white
            flex
            items-center
            overflow-hidden
            min-h-[260px]
            sm:min-h-[340px]
            md:min-h-[420px]
            lg:min-h-[520px]
            p-5
            sm:p-6
            md:p-10
          "
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/df90yqmzu/image/upload/v1768329858/trending-now-banner_o9ajuf.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-xs sm:max-w-sm md:max-w-xl">
            <Link
              href="/categories/best-sellers"
              className="
                inline-block
                bg-white
                text-black
                px-5
                sm:px-6
                py-2.5
                sm:py-3
                rounded-full
                font-semibold
                transition-transform
                hover:scale-105
              "
            >
              Best Sellers →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
