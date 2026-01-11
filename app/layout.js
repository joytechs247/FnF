import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FibresNFools - Playful Streetwear for Gen-Z',
  description: 'Fun, colorful, and quirky streetwear that speaks your language. Quality apparel with a touch of humor.',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}