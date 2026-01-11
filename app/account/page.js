// 'use client'

// import ProtectedRoute from '@/components/ProtectedRoute'


// import { useAuth } from '@/context/AuthContext'
// import { useState } from 'react'
// import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX, FiPackage, FiHeart, FiSettings } from 'react-icons/fi'

// export default function AccountPage() {
//   const { user, userProfile, logout, updateUserProfile } = useAuth()
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState({
//     displayName: user?.displayName || user?.email?.split('@')[0] || '',
//     phone: '',
//     bio: 'Fashion enthusiast and FnF lover! 👕✨'
//   })

//   const stats = [
//     { label: 'Orders', value: '12', icon: <FiPackage />, color: 'text-blue-500' },
//     { label: 'Wishlist', value: '8', icon: <FiHeart />, color: 'text-pink-500' },
//     { label: 'Reviews', value: '5', icon: '⭐', color: 'text-yellow-500' },
//     { label: 'Member Since', value: '2024', icon: '📅', color: 'text-green-500' },
//   ]

//   const recentOrders = [
//     { id: 'FNF-12345', date: 'Jan 15, 2024', total: '₹2,599', status: 'Delivered', items: 2 },
//     { id: 'FNF-12344', date: 'Jan 10, 2024', total: '₹1,299', status: 'Shipped', items: 1 },
//     { id: 'FNF-12343', date: 'Jan 5, 2024', total: '₹3,898', status: 'Processing', items: 3 },
//   ]

//   const handleSave = async () => {
//     try {
//       await updateUserProfile(formData)
//       setIsEditing(false)
//     } catch (error) {
//       console.error('Error updating profile:', error)
//     }
//   }

//   const handleLogout = async () => {
//     try {
//       await logout()
//     } catch (error) {
//       console.error('Logout error:', error)
//     }
//   }

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen py-8 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
//               >
//                 Logout
//               </button>
//             </div>

//             <div className="grid lg:grid-cols-3 gap-8">
//               {/* Left Column - Profile */}
//               <div className="lg:col-span-2 space-y-8">
//                 {/* Profile Card */}
//                 <div className="card p-6">
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-20 h-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                         {formData.displayName?.charAt(0) || 'U'}
//                       </div>
//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900">
//                           {isEditing ? (
//                             <input
//                               type="text"
//                               value={formData.displayName}
//                               onChange={(e) => setFormData({...formData, displayName: e.target.value})}
//                               className="input-field"
//                             />
//                           ) : (
//                             formData.displayName
//                           )}
//                         </h2>
//                         <p className="text-gray-600 flex items-center gap-2">
//                           <FiMail className="text-sm" />
//                           {user?.email}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//                       className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                     >
//                       {isEditing ? <FiSave /> : <FiEdit2 />}
//                       {isEditing ? 'Save' : 'Edit'}
//                     </button>
//                   </div>

//                   {isEditing && (
//                     <div className="space-y-4 mb-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Phone Number
//                         </label>
//                         <div className="relative">
//                           <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <input
//                             type="tel"
//                             value={formData.phone}
//                             onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                             className="input-field pl-12"
//                             placeholder="+91 9876543210"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Bio
//                         </label>
//                         <textarea
//                           value={formData.bio}
//                           onChange={(e) => setFormData({...formData, bio: e.target.value})}
//                           className="input-field h-24"
//                           placeholder="Tell us about yourself..."
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                     {stats.map((stat, index) => (
//                       <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
//                         <div className={`text-2xl mb-2 ${stat.color}`}>
//                           {stat.icon}
//                         </div>
//                         <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
//                         <div className="text-sm text-gray-600">{stat.label}</div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Bio */}
//                   {!isEditing && (
//                     <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
//                       <p className="text-gray-700">{formData.bio}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Recent Orders */}
//                 <div className="card p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                     <FiPackage />
//                     Recent Orders
//                   </h3>
                  
//                   {recentOrders.length > 0 ? (
//                     <div className="space-y-4">
//                       {recentOrders.map(order => (
//                         <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{order.id}</h4>
//                             <p className="text-sm text-gray-600">{order.date} • {order.items} item(s)</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-bold text-gray-900">{order.total}</p>
//                             <span className={`inline-block px-2 py-1 text-xs rounded-full ${
//                               order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
//                               order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
//                               'bg-yellow-100 text-yellow-800'
//                             }`}>
//                               {order.status}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <div className="text-4xl mb-4">📦</div>
//                       <p className="text-gray-600">No orders yet</p>
//                       <button className="mt-4 text-[var(--primary)] hover:underline">
//                         Start Shopping →
//                       </button>
//                     </div>
//                   )}
                  
//                   <div className="mt-6 text-center">
//                     <button className="text-[var(--primary)] hover:underline font-medium">
//                       View All Orders
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Quick Actions */}
//               <div className="space-y-8">
//                 {/* Address Book */}
//                 <div className="card p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <FiMapPin />
//                     Address Book
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="p-4 border border-gray-200 rounded-xl">
//                       <h4 className="font-semibold text-gray-900">Home Address</h4>
//                       <p className="text-sm text-gray-600 mt-1">123 Street, City, State 123456</p>
//                       <button className="mt-3 text-sm text-[var(--primary)] hover:underline">
//                         Edit Address
//                       </button>
//                     </div>
//                     <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
//                       + Add New Address
//                     </button>
//                   </div>
//                 </div>

//                 {/* Quick Links */}
//                 <div className="card p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <FiSettings />
//                     Account Settings
//                   </h3>
//                   <div className="space-y-3">
//                     {[
//                       { label: 'Order History', icon: '📦' },
//                       { label: 'Wishlist', icon: '❤️' },
//                       { label: 'Payment Methods', icon: '💳' },
//                       { label: 'Notifications', icon: '🔔' },
//                       { label: 'Security', icon: '🔒' },
//                       { label: 'Help Center', icon: '❓' },
//                     ].map((item, index) => (
//                       <button
//                         key={index}
//                         className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-xl">{item.icon}</span>
//                           <span className="text-gray-700">{item.label}</span>
//                         </div>
//                         <span>→</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Support Card */}
//                 <div className="card p-6 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10">
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
//                   <p className="text-gray-600 text-sm mb-4">
//                     Our support team is here to help with any questions.
//                   </p>
//                   <div className="space-y-3">
//                     <button className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//                       📞 Call Support
//                     </button>
//                     <button className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//                       💬 Chat on WhatsApp
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   )
// }





"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AccountPage() {
  const router = useRouter();
  const { user, userProfile, loading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Authentication required</p>
      </div>
    );
  }

  const displayName =
    userProfile?.displayName ||
    user.displayName ||
    user.email?.split("@")[0] ||
    "User";

  const createdAt =
    userProfile?.createdAt
      ? new Date(userProfile.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Recently";

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12">
      <div className="container-responsive section-padding max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
              Welcome back, {displayName}!
            </h1>
            <p className="text-gray-600">Manage your account details</p>
          </div>

          {/* Account Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Account Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-medium">{displayName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Member Since</div>
                <div className="font-medium">{createdAt}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => router.push("/shop")}
                className="p-4 bg-white border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-colors text-left"
              >
                <div className="font-semibold text-gray-800 mb-1">
                  Continue Shopping
                </div>
                <div className="text-sm text-gray-600">
                  Browse products
                </div>
              </button>

              <button
                onClick={() => router.push("/orders")}
                className="p-4 bg-white border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-colors text-left"
              >
                <div className="font-semibold text-gray-800 mb-1">
                  View Orders
                </div>
                <div className="text-sm text-gray-600">
                  Track your orders
                </div>
              </button>

              <button
                onClick={() => router.push("/account/addresses")}
                className="p-4 bg-white border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-colors text-left"
              >
                <div className="font-semibold text-gray-800 mb-1">
                  Manage Addresses
                </div>
                <div className="text-sm text-gray-600">
                  Add or edit addresses
                </div>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 pt-8 border-t border-pink-100">
            <button
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="px-6 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
