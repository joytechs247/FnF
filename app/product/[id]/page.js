'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { FiHeart, FiShare2, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi'
import products from '@/data/products.json'

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Black')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const product = products.find(p => p.id === params.id) || products[0]
  
  const productImages = [
    { id: 1, color: 'Black' },
    { id: 2, color: 'White' },
    { id: 3, color: 'Pink' },
    { id: 4, color: 'Detail' },
  ]

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity)
    // Show success message
    alert(`Added ${quantity} × ${product.name} (${selectedSize}) to cart! 🛒`)
  }

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Check out this awesome product from FibresNFools!\n\n` +
      `*${product.name}*\n` +
      `Price: ₹${product.price}\n` +
      `Size: ${selectedSize}\n` +
      `Color: ${selectedColor}\n\n` +
      `${window.location.href}`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-[var(--primary)]">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-[var(--primary)]">Shop</a>
          <span>/</span>
          <a href={`/shop?category=${product.category}`} className="hover:text-[var(--primary)] capitalize">
            {product.category}
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="rounded-3xl overflow-hidden mb-4">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-8xl">{product.emoji}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 ${
                    activeImage === index
                      ? 'border-[var(--primary)]'
                      : 'border-transparent'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <div className="text-2xl">{product.emoji}</div>
                  </div>
                  <div className="text-xs text-center mt-1">{image.color}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                {product.isNew && (
                  <span className="bg-[var(--accent)] text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                    NEW
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-lg mb-4">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-red-600 font-bold">
                      Save ₹{(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors?.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      selectedColor === color
                        ? 'border-gray-900'
                        : 'border-gray-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="inline-block mt-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                View size guide
              </a>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-100">
                    <FiHeart className="text-xl" />
                  </button>
                  <button
                    onClick={handleWhatsAppShare}
                    className="p-3 border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <FiShare2 className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <button className="w-full btn-primary mb-8">
              Buy Now - ₹{(product.price * quantity).toFixed(2)}
            </button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <FiTruck className="text-2xl text-[var(--primary)]" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-600">Over ₹1499</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <FiShield className="text-2xl text-[var(--primary)]" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-gray-600">30 Days Policy</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium quality fabric for maximum comfort</li>
                <li>• Designed and printed in India</li>
                <li>• Machine wash cold, gentle cycle</li>
                <li>• Tumble dry low or line dry</li>
                <li>• 100% satisfaction guarantee</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="card p-4">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-4xl">{relatedProduct.emoji}</div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{relatedProduct.name}</h3>
                  <p className="text-[var(--primary)] font-bold">₹{relatedProduct.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}