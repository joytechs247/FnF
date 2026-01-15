'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { FiHeart, FiShare2, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi'
import * as firestore from '@/lib/firestore'
import { useAuth } from '@/context/AuthContext'

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    if (params.id) {
      loadProduct()
    }
  }, [params.id])

  const loadProduct = async () => {
    if (!params?.id) return

    try {
      setLoading(true)

      const productData = await firestore.getProductById(params.id)
      if (!productData) return

      setProduct(productData)
      setSelectedColor(productData.colors?.[0] || '')

      // Reviews (safe now)
      const productReviews = await firestore.getProductReviews(params.id)
      setReviews(productReviews)

      // Related products
      let relatedProductsData = []

      if (productData.category) {
        const related = await firestore.getProducts({
          category: productData.category,
          limit: 4
        })
        relatedProductsData = related.filter(p => p.id !== params.id)
      }

      setRelatedProducts(relatedProductsData)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }



  const handleAddToCart = () => {
    if (!product) return

    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addToCart(
      product,              // FULL product object
      selectedSize,          // size (string)
      quantity,              // quantity (number)
      selectedColor          // color (string | null)
    )

    alert(`Added ${quantity} × ${product.name} (${selectedSize}) to cart!`)
  }



  const handleWhatsAppShare = () => {
    if (!product) return

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

  const addToWishlist = async () => {
    if (!user || !product) {
      alert('Please login to add to wishlist')
      return
    }

    try {
      // Add to wishlist in Firestore
      // Implement wishlist functionality
      alert('Added to wishlist! ❤️')
    } catch (error) {
      console.error('Error adding to wishlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <a href="/shop" className="btn-primary mt-6 inline-block">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  const handleBuyNow = () => {
    handleAddToCart()
    window.location.href = '/cart'
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
            {/* Main Product Image */}
            <div className="rounded-3xl overflow-hidden mb-4">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[activeImage || 0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/placeholder-product.png"
                    alt="Placeholder"
                    className="w-24 h-24 object-contain opacity-50"
                  />
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 ${activeImage === index
                      ? 'border-[var(--primary)]'
                      : 'border-transparent'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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
                {product.discountPrice && (
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
                  ₹{product.discountPrice.toFixed(2)}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-red-600 font-bold">
                      Save ₹{(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Color: {selectedColor}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${selectedColor === color
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
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full font-medium transition-all ${selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

                </div>


              </div>
              <div className="flex gap-3 py-5">
                <button
                  onClick={addToWishlist}
                  className="p-3 border border-gray-300 rounded-full hover:bg-gray-100"
                >
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

            {/* Buy Now Button */}
            {/* <button
              onClick={handleBuyNow}
              className="w-full btn-primary mb-8"
            >
              Buy Now - ₹{((product.discountPrice ?? product.price) * quantity).toFixed(2)}
            </button> */}


            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <FiTruck className="text-2xl text-[var(--primary)]" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-600">Over ₹999</p>
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
              <div className="text-gray-600 space-y-2">
                {product.details?.split('\n').map((detail, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </div>
                )) || (
                    <>
                      <div>• Premium quality fabric for maximum comfort</div>
                      <div>• Designed and printed in India</div>
                      <div>• Machine wash cold, gentle cycle</div>
                      <div>• Tumble dry low or line dry</div>
                      <div>• 100% satisfaction guarantee</div>
                    </>
                  )}
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 2).map(review => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full"></div>
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="card p-4">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-4xl">{relatedProduct.emoji || '👕'}</div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{relatedProduct.name}</h3>
                  <p className="text-[var(--primary)] font-bold">₹{relatedProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
