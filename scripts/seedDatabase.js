const { initializeApp } = require('firebase/app')
const { getFirestore, collection, doc, setDoc, addDoc } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const products = [
  {
    name: 'Monday Vibes Tee',
    category: 'tshirts',
    price: 1299,
    discountPrice: 1599,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink'],
    description: 'Perfect for those Monday blues with a touch of humor',
    details: '100% Cotton\nSoft premium fabric\nRegular fit\nMachine washable',
    isNew: true,
    isFeatured: true,
    popularity: 95,
    emoji: '😴',
    tags: ['new', 'bestseller', 'limited'],
    images: ['monday-vibes-1.jpg', 'monday-vibes-2.jpg'],
    stock: 42,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Code & Coffee Hoodie',
    category: 'hoodies',
    price: 2599,
    discountPrice: 2999,
    sizes: ['M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy'],
    description: 'For the developers who run on caffeine and code',
    details: '80% Cotton, 20% Polyester\nFleece lined\nKangaroo pocket\nMachine wash cold',
    isNew: true,
    isFeatured: true,
    popularity: 88,
    emoji: '👨‍💻',
    tags: ['new', 'trending'],
    images: ['code-coffee-1.jpg', 'code-coffee-2.jpg'],
    stock: 18,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Sarcasm Level: Expert',
    category: 'oversized',
    price: 1499,
    discountPrice: 1799,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Yellow', 'Green'],
    description: 'Oversized comfort with maximum attitude',
    details: '100% Cotton\nOversized fit\nSoft fabric\nMachine washable',
    isNew: true,
    isFeatured: true,
    popularity: 92,
    emoji: '😏',
    tags: ['new', 'bestseller'],
    images: ['sarcasm-1.jpg', 'sarcasm-2.jpg'],
    stock: 24,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Yarn Dreams Sweatshirt',
    category: 'sweatshirts',
    price: 1999,
    sizes: ['S', 'M', 'L'],
    colors: ['Pink', 'Purple', 'Blue'],
    description: 'Cozy sweatshirt for the creative souls',
    details: 'Fleece interior\nRibbed cuffs\nComfort fit\nMachine wash gentle',
    isNew: false,
    isFeatured: true,
    popularity: 76,
    emoji: '🧶',
    tags: ['cozy', 'creative'],
    images: ['yarn-dreams-1.jpg', 'yarn-dreams-2.jpg'],
    stock: 16,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Weekend Mode Activated',
    category: 'tshirts',
    price: 1199,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Red'],
    description: 'Ready for the weekend vibes',
    details: '100% Cotton\nGraphic print\nRegular fit\nMachine washable',
    isNew: false,
    isFeatured: false,
    popularity: 81,
    emoji: '🎉',
    tags: ['weekend', 'vibes'],
    images: ['weekend-mode-1.jpg', 'weekend-mode-2.jpg'],
    stock: 56,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Chill Beanie',
    category: 'accessories',
    price: 699,
    sizes: ['One Size'],
    colors: ['Black', 'Grey', 'Navy'],
    description: 'Keep it cool with our signature beanie',
    details: 'Acrylic knit\nStretchy fit\nOne size fits all\nHand wash recommended',
    isNew: true,
    isFeatured: false,
    popularity: 67,
    emoji: '🧢',
    tags: ['new', 'accessory'],
    images: ['beanie-1.jpg', 'beanie-2.jpg'],
    stock: 32,
    createdAt: new Date().toISOString()
  }
]

const categories = [
  { name: 'tshirts', displayName: 'T-Shirts', productCount: 42, emoji: '👕' },
  { name: 'hoodies', displayName: 'Hoodies', productCount: 18, emoji: '🧥' },
  { name: 'oversized', displayName: 'Oversized', productCount: 24, emoji: '📏' },
  { name: 'sweatshirts', displayName: 'Sweatshirts', productCount: 16, emoji: '🧶' },
  { name: 'accessories', displayName: 'Accessories', productCount: 32, emoji: '🧢' },
  { name: 'limited', displayName: 'Limited Edition', productCount: 8, emoji: '✨' }
]

const seedDatabase = async () => {
  try {
    console.log('Seeding database...')
    
    // Seed categories
    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.name), category)
      console.log(`Added category: ${category.name}`)
    }
    
    // Seed products
    for (const product of products) {
      const docRef = doc(collection(db, 'products'))
      await setDoc(docRef, product)
      console.log(`Added product: ${product.name}`)
    }
    
    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seedDatabase()