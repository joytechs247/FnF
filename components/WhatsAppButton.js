'use client'

import { FiMessageSquare } from 'react-icons/fi'

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hey FibresNFools! 👋 I need some help with my order.")
    window.open(`https://wa.me/919651743565?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 animate-bounce"
      aria-label="Chat with us on WhatsApp"
    >
      <FiMessageSquare className="text-2xl" />
    </button>
  )
}