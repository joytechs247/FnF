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
                  {product.description || product.category}
                </p>

                <div className="flex gap-2 mt-3">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
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

                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)] transition-colors"
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
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
    <div
      className="card overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-4xl">{product.emoji || '👕'}</div>
          </div>
        </Link>

        {/* Quick actions overlay */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <FiShoppingCart className="text-xl" />
          </button>

          <Link
            href={`/product/${product.id}`}
            className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <FiEye className="text-xl" />
          </Link>
        </div>

        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[var(--accent)] text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}
      </div>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mt-1">{product.category}</p>

        {/* Size selector */}
        <div className="flex gap-2 mt-3 mb-4">
          {product.sizes?.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                selectedSize === size
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)] transition-colors"
          >
            <FiShoppingCart />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
