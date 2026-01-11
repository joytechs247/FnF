// 'use client'

// import Link from 'next/link'
// import { useCart } from '@/context/CartContext'
// import { FiShoppingCart, FiEye } from 'react-icons/fi'
// import { useState } from 'react'

// export default function ProductCard({ product }) {
//   const { addToCart } = useCart()
//   const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M')
//   const [isHovered, setIsHovered] = useState(false)

//   const handleAddToCart = () => {
//     addToCart(product, selectedSize)
//     // Show success notification
//     alert(`Added ${product.name} (${selectedSize}) to cart! 🛒`)
//   }

//   return (
//     <div 
//       className="card overflow-hidden group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative overflow-hidden">
//         <Link href={`/product/${product.id}`}>
//           <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//             {/* Product image placeholder */}
//             <div className="text-4xl">{product.emoji || '👕'}</div>
//           </div>
//         </Link>

//         {/* Quick actions overlay */}
//         <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${
//           isHovered ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <button
//             onClick={handleAddToCart}
//             className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform"
//           >
//             <FiShoppingCart className="text-xl" />
//           </button>
//           <Link 
//             href={`/product/${product.id}`}
//             className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform"
//           >
//             <FiEye className="text-xl" />
//           </Link>
//         </div>

//         {/* Badge */}
//         {product.isNew && (
//           <div className="absolute top-3 left-3 bg-[var(--accent)] text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
//             NEW
//           </div>
//         )}
//       </div>

//       <div className="p-4">
//         <Link href={`/product/${product.id}`}>
//           <h3 className="font-bold text-gray-900 hover:text-[var(--primary)] transition-colors">
//             {product.name}
//           </h3>
//         </Link>
//         <p className="text-sm text-gray-600 mt-1">{product.category}</p>

//         {/* Size selector */}
//         <div className="flex gap-2 mt-3 mb-4">
//           {product.sizes?.map(size => (
//             <button
//               key={size}
//               onClick={() => setSelectedSize(size)}
//               className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
//                 selectedSize === size
//                   ? 'bg-[var(--primary)] text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center justify-between">
//           <span className="text-xl font-bold text-gray-900">
//             ₹{product.price.toFixed(2)}
//           </span>
//           <button
//             onClick={handleAddToCart}
//             className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)] transition-colors"
//           >
//             <FiShoppingCart />
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }





'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiEye } from 'react-icons/fi'
import { useState } from 'react'

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M')
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, selectedSize)
    alert(`Added ${product.name} (${selectedSize}) to cart! 🛒`)
  }

  /* =========================
     LIST VIEW
  ========================== */
  if (viewMode === 'list') {
    return (
      <div className="card overflow-hidden">
        <div className="flex">
          <Link href={`/product/${product.id}`} className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-3xl">{product.emoji || '👕'}</div>
            </div>
          </Link>

          <div className="flex-grow p-4">
            <div className="flex justify-between h-full gap-4">
              <div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-bold text-gray-900 hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 mt-1">
                  {product.description}
                </p>

                {/* <div className="flex gap-2 mt-3">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${selectedSize === size
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div> */}
              </div>

              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </div>

                  {product.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)] transition-colors"
                >
                  <FiShoppingCart />
                  Add to Cart
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* =========================
     GRID VIEW (ORIGINAL)
  ========================== */
  return (
    // <div
    //   className="card overflow-hidden group"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <div className="relative overflow-hidden">
    //     <Link href={`/product/${product.id}`}>
    //       <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
    //         <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 sm:mb-4">
    //           <img
    //             src={product.images?.[0]}
    //             alt={product.name}
    //             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    //             loading="lazy"
    //             href={`/product/${product.id}`}
    //           />
    //         </div>

    //       </div>
    //     </Link>

    //     {/* Quick actions overlay */}
    //     <div
    //       className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
    //         }`}
    //     >
    //       <button
    //         onClick={handleAddToCart}
    //         className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform"
    //       >
    //         <FiShoppingCart className="text-xl" />
    //       </button>

    //       <Link
    //         href={`/product/${product.id}`}
    //         className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform"
    //       >
    //         <FiEye className="text-xl" />
    //       </Link>
    //     </div>

    //     {/* Badge */}
    //     {product.isNew && (
    //       <div className="absolute top-3 left-3 bg-[var(--accent)] text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
    //         NEW
    //       </div>
    //     )}
    //   </div>

    //   <div className="p-4">
    //     <Link href={`/product/${product.id}`}>
    //       <h3 className="font-bold text-gray-900 hover:text-[var(--primary)] transition-colors">
    //         {product.name}
    //       </h3>
    //     </Link>

    //     <p className="text-sm text-gray-600 mt-1">{product.description}</p>

    //     {/* Size selector */}
    //     {/* <div className="flex gap-2 mt-3 mb-4">
    //       {product.sizes?.map(size => (
    //         <button
    //           key={size}
    //           onClick={() => setSelectedSize(size)}
    //           className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${selectedSize === size
    //               ? 'bg-[var(--primary)] text-white'
    //               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    //             }`}
    //         >
    //           {size}
    //         </button>
    //       ))}
    //     </div> */}

    //     <div className="flex items-center justify-between">
    //       <span className="text-xl font-bold text-gray-900">
    //         ₹{(product.discountPrice ?? product.price).toFixed(2)}
    //       </span>

    //       {/* <button
    //         onClick={handleAddToCart}
    //         className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)] transition-colors"
    //       >
    //         <FiShoppingCart />
    //         Add
    //       </button> */}
    //     </div>
    //   </div>
    // </div>





    <div
      className="card overflow-hidden group border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Subtle cart icon overlay - always visible */}
              <button
                onClick={handleAddToCart}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 z-10 "
                aria-label="Add to cart"
              >
                <FiShoppingCart className="text-lg" />
              </button>
            </div>
          </div>
        </Link>

        {/* Badge with improved design */}
        {product.isNew && (
          <div className="absolute top-1 left-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white px-2 py-1.5 rounded-lg text-xs font-light sm:font-bold shadow-md">
            NEW ARRIVAL
          </div>
        )}

        {/* Discount badge if applicable */}
        {/* {product.discountPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )} */}
      </div>

      <div className="p-5 bg-white">
        <div className="mb-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 sm:text-lg text-md hover:text-[var(--primary)] transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        </div>

        {/* Rating stars - optional */}
        {/* <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">(24)</span>
        </div> */}

        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-md sm:text-2xl font-bold text-gray-900">
              ₹{(product.discountPrice ?? product.price).toLocaleString('en-IN')}
            </span>
            {/* {product.discountPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )} */}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-600 font-medium">In Stock</span>
          </div>
        </div>

        {/* Quick view button - subtle and clean */}
        <div className="mt-4 pt-1 ">
          <Link
            href={`/product/${product.id}`}
            className="block w-full text-center py-2.5 text-sm font-medium text-[var(--primary)] border border-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
