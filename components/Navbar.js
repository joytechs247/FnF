// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import { useCart } from '@/context/CartContext'
// import { useAuth } from '@/context/AuthContext'
// import { FiShoppingBag, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi'

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const { cartCount } = useCart()
//   const { user } = useAuth()

//   return (
//     <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full"></div>
//             <span className="text-2xl font-bold text-gray-900">FibresNFools</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
//               Home
//             </Link>
//             <Link href="/shop" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
//               Shop
//             </Link>
//             <Link href="/categories" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
//               Categories
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
//               Why FnF?
//             </Link>
//           </div>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-6">
//             <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
//               <FiSearch className="text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search for quirky stuff..."
//                 className="bg-transparent ml-2 outline-none w-48"
//               />
//             </div>

//             <Link href="/account" className="hidden md:block">
//               <FiUser className="text-2xl text-gray-700 hover:text-[var(--primary)] transition-colors" />
//             </Link>

//             <Link href="/cart" className="relative">
//               <FiShoppingBag className="text-2xl text-gray-700 hover:text-[var(--primary)] transition-colors" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {user ? (
//               <div className="hidden md:flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Hey, {user.email.split('@')[0]}!</span>
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center space-x-3">
//                 <Link href="/auth/login" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                   Login
//                 </Link>
//                 <Link href="/auth/signup" className="btn-primary px-4 py-2 text-sm">
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <FiX className="text-2xl" />
//               ) : (
//                 <FiMenu className="text-2xl" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 border-t pt-4">
//             <div className="flex flex-col space-y-4">
//               <Link href="/" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                 Home
//               </Link>
//               <Link href="/shop" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                 Shop
//               </Link>
//               <Link href="/categories" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                 Categories
//               </Link>
//               <Link href="/about" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                 Why FnF?
//               </Link>
//               {!user && (
//                 <>
//                   <Link href="/auth/login" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                     Login
//                   </Link>
//                   <Link href="/auth/signup" className="text-gray-700 hover:text-[var(--primary)] font-medium">
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }









'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import {
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
} from 'react-icons/fi'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const dropdownRef = useRef(null)

  const { cartCount } = useCart()
  const { user, logout } = useAuth() // ensure logout exists in AuthContext

  /* Close user dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full" />
            <span className="text-2xl font-bold text-gray-900">
              FibresNFools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/shop" className="nav-link">
              Shop
            </Link>
            <Link href="/categories" className="nav-link">
              Categories
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[var(--primary)] font-medium">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search for quirky stuff..."
                className="bg-transparent ml-2 outline-none w-48"
              />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <FiShoppingBag className="text-2xl text-gray-700 hover:text-[var(--primary)] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Section */}
            {user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 text-gray-700 hover:text-[var(--primary)] transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <FiChevronDown />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-gray-900">
                        {user.email?.split('@')[0]}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/account"
                      className="dropdown-item"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="dropdown-item"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      My Orders
                    </Link>
                    {/* <Link
                      href="/wishlist"
                      className="dropdown-item"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Wishlist
                    </Link> */}

                    <Link href="/contact" className="text-gray-700 hover:text-[var(--primary)] font-medium">
                      Contact
                    </Link>

                    <button
                      onClick={() => {
                        logout()
                        setShowUserDropdown(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-[var(--primary)] font-medium"
                >
                  Login
                </Link>
                {/* <Link
                  href="/auth/signup"
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Sign Up
                </Link> */}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="mobile-link">
                Home
              </Link>
              <Link href="/shop" className="mobile-link">
                Shop
              </Link>
              <Link href="/categories" className="mobile-link">
                Categories
              </Link>
              <Link href="/about" className="mobile-link">
                Why FnF?
              </Link>

              {!user && (
                <>
                  <Link href="/auth/login" className="mobile-link">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="mobile-link">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
