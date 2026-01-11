import Link from 'next/link'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/logo.png"   // put your logo in /public/logo.png
                  alt="FibresNFools"
                  className="h-15 w-full object-contain"
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-6">
              We create streetwear that makes you smile. Quality fabrics, quirky designs, and good vibes only.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Shop Quick</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop/categories/tshirts" className="text-gray-400 hover:text-white transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/categories/hoodies" className="text-gray-400 hover:text-white transition-colors">
                  Hoodies & Sweatshirts
                </Link>
              </li>
              <li>
                <Link href="/categories/oversized" className="text-gray-400 hover:text-white transition-colors">
                  Oversized Tees
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/categories/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Help & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="text-lg font-bold mb-6">Stay in the Loop</h3>
            <p className="text-gray-400 mb-4">
              Get exclusive deals, new drops, and behind-the-scenes content!
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-[var(--primary)] outline-none text-white"
              />
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <FiMail />
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} FibresNFools. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Secure Payment:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">UPI</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">Cards</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}