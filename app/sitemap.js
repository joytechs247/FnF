import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default async function sitemap() {
  const baseUrl = 'https://www.fnf.in'

  const staticPages = [
    '',
    '/shop',
    '/categories',
    '/contact',
    '/about'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 🔹 Product URLs
  const productsSnap = await getDocs(collection(db, 'products'))
  const productPages = productsSnap.docs.map(doc => ({
    url: `${baseUrl}/product/${doc.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticPages, ...productPages]
}
