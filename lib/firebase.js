import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Collection references
export const collections = {
  users: collection(db, 'users'),
  products: collection(db, 'products'),
  orders: collection(db, 'orders'),
  categories: collection(db, 'categories'),
  addresses: (userId) => collection(db, `users/${userId}/addresses`),
  wishlist: (userId) => collection(db, `users/${userId}/wishlist`),
  cart: (userId) => collection(db, `users/${userId}/cart`),
  reviews: collection(db, 'reviews')
}