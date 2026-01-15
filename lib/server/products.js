// lib/server/products.js
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function getProductForMeta(id) {
  const snap = await getDoc(doc(db, 'products', id))

  if (!snap.exists()) return null

  const data = snap.data()

  return {
    id: snap.id,
    name: data.name ?? '',
    description: data.description ?? '',
    image: data.images?.[0] ?? null,
  }
}
