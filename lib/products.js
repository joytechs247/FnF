// lib/products.js

import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as limitFn
} from 'firebase/firestore'

const productsRef = collection(db, 'products')

/* =========================
   CORE FETCHER
========================= */

async function fetchProducts(q) {
  const snap = await getDocs(q)
  return snap.docs.map(doc => {
    const data = doc.data()

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : null
    }
  })

}

/* =========================
   BASIC FETCHERS
========================= */

export async function getAllProducts() {
  return fetchProducts(productsRef)
}

export async function getNewProducts(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limitFn(limit)
    )
  )
}

export async function getTrendingProducts(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      orderBy('popularity', 'desc'),
      limitFn(limit)
    )
  )
}

export async function getProductsByCategory(category, limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('category', '==', category),
      limitFn(limit)
    )
  )
}

/* =========================
   HOME PAGE CURATED SECTIONS
========================= */

export async function getFeaturedProducts(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('isFeatured', '==', true),
      limitFn(limit)
    )
  )
}

export async function getBestSellers(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      orderBy('salesCount', 'desc'),
      limitFn(limit)
    )
  )
}

export async function getBestForMen(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('gender', '==', 'men'),
      limitFn(limit)
    )
  )
}

export async function getBestForWomen(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('gender', '==', 'women'),
      limitFn(limit)
    )
  )
}

export async function getStreetwearProducts(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('style', '==', 'streetwear'),
      limitFn(limit)
    )
  )
}

export async function getBestInHoodies(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('category', '==', 'hoodies'),
      limitFn(limit)
    )
  )
}

export async function getBestInShirts(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('category', '==', 'shirts'),
      limitFn(limit)
    )
  )
}

export async function getOversizedFits(limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('fit', '==', 'oversized'),
      limitFn(limit)
    )
  )
}

export async function getBudgetPicks(maxPrice = 999, limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('discountPrice', '<=', maxPrice),
      orderBy('discountPrice', 'asc'),
      limitFn(limit)
    )
  )
}

export async function getPremiumProducts(minPrice = 1999, limit = 4) {
  return fetchProducts(
    query(
      productsRef,
      where('price', '>=', minPrice),
      orderBy('price', 'desc'),
      limitFn(limit)
    )
  )
}
