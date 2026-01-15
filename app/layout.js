import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })



export const metadata = {
  metadataBase: new URL('https://www.fnf.in'),
  title: {
    default: 'FibresNFools - Playful Streetwear & Limited Drops',
    template: '%s | FibresNFools',
  },
  description:
    'Shop premium streetwear at FibresNFools. Oversized tees, hoodies, limited drops & playful fashion for bold personalities.',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
  keywords: [
    'streetwear India',
    'oversized t-shirts',
    'hoodies India',
    'quirky fashion',
    'FibresNFools',
    'limited drops clothing'
  ],
  openGraph: {
    title: 'FibresNFools – Wear the Fun',
    description:
      'Bold streetwear with premium fabrics. Limited drops. Made for fun.',
    url: 'https://www.fnf.in',
    siteName: 'FibresNFools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FibresNFools Streetwear',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FibresNFools – Streetwear with Personality',
    description: 'Oversized tees, hoodies & limited drops.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
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