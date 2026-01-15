import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  increment,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { db, collections } from './firebase'







// Products
export const getProducts = async (filters = {}) => {
  try {
    let q = query(collections.products)
    
    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category))
    }
    
    if (filters.isFeatured) {
      q = query(q, where('isFeatured', '==', true))
    }
    
    if (filters.isNew) {
      q = query(q, where('isNew', '==', true))
    }
    
    if (filters.limit) {
      q = query(q, limit(filters.limit))
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          q = query(q, orderBy('price', 'asc'))
          break
        case 'price-high':
          q = query(q, orderBy('price', 'desc'))
          break
        case 'newest':
          q = query(q, orderBy('createdAt', 'desc'))
          break
        case 'popular':
          q = query(q, orderBy('popularity', 'desc'))
          break
      }
    }
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting products:', error)
    return []
  }
}

export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting product:', error)
    return null
  }
}

export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collections.categories)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting categories:', error)
    return []
  }
}

// User Cart
export const getUserCart = async (userId) => {
  try {
    const cartRef = collections.cart(userId)
    const snapshot = await getDocs(cartRef)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting user cart:', error)
    return []
  }
}

export const addToCart = async (userId, cartItem) => {
  if (!userId || !cartItem?.productId || !cartItem?.size) {
    console.error('Invalid cart item:', cartItem)
    return false
  }

  try {
    const cartRef = collection(db, 'users', userId, 'cart')

    // Build query dynamically (VERY IMPORTANT)
    const conditions = [
      where('productId', '==', cartItem.productId),
      where('size', '==', cartItem.size)
    ]

    if (cartItem.color) {
      conditions.push(where('color', '==', cartItem.color))
    }

    const q = query(cartRef, ...conditions)
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref
      await updateDoc(docRef, {
        quantity: increment(cartItem.quantity)
      })
    } else {
      await addDoc(cartRef, cartItem)
    }

    return true
  } catch (error) {
    console.error('Error adding to cart:', error)
    return false
  }
}


export const updateCartItem = async (userId, itemId, updates) => {
  try {
    const itemRef = doc(db, `users/${userId}/cart/${itemId}`)
    await updateDoc(itemRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
    return true
  } catch (error) {
    console.error('Error updating cart item:', error)
    return false
  }
}

export const removeFromCart = async (userId, itemId) => {
  try {
    const itemRef = doc(db, `users/${userId}/cart/${itemId}`)
    await deleteDoc(itemRef)
    return true
  } catch (error) {
    console.error('Error removing from cart:', error)
    return false
  }
}

export const clearCart = async (userId) => {
  try {
    const cartRef = collections.cart(userId)
    const snapshot = await getDocs(cartRef)
    
    const deletePromises = snapshot.docs.map(doc =>
      deleteDoc(doc.ref)
    )
    
    await Promise.all(deletePromises)
    return true
  } catch (error) {
    console.error('Error clearing cart:', error)
    return false
  }
}

// Orders
// export const createOrder = async (orderData) => {
//   try {
//     const ordersRef = collections.orders
//     const orderRef = await addDoc(ordersRef, {
//       ...orderData,
//       status: 'pending',
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp()
//     })
    
//     return { id: orderRef.id, ...orderData }
//   } catch (error) {
//     console.error('Error creating order:', error)
//     return null
//   }
// }

// export const createOrder = async (order) => {
//   try {
//     const orderRef = await addDoc(collection(db, 'orders'), {
//       ...order,
//       createdAt: new Date().toISOString(),
//       date: new Date().toISOString()
//     })

//     // 🔹 LINK ORDER TO USER
//     const userRef = doc(db, 'users', order.userId)

//     await updateDoc(userRef, {
//       orders: arrayUnion({
//         orderId: orderRef.id,
//         createdAt: new Date().toISOString(),
//         total: order.total,
//         image: cart?.[0]?.productImage || "",
//         status: order.status
//       })
//     })

//     return { id: orderRef.id }
//   } catch (error) {
//     console.error('Error creating order:', error)
//     return null
//   }
// }




export const createOrder = async (order) => {
  try {
    // 1️⃣ CREATE ORDER (MAIN COLLECTION)
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString()
    })

    // 2️⃣ LINK ORDER TO USER (SUMMARY ONLY)
    const userRef = doc(db, 'users', order.userId)

    const firstItemImage =
      order.items?.[0]?.image || ""

    await updateDoc(userRef, {
      orders: arrayUnion({
        orderId: orderRef.id,
        createdAt: new Date().toISOString(),
        total: order.total || 0,
        image: firstItemImage,
        status: order.status || 'processing'
      })
    })

    return { id: orderRef.id }
  } catch (error) {
    console.error('Error creating order:', error)
    return null
  }
}





export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collections.orders,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting user orders:', error)
    return []
  }
}

export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting order:', error)
    return null
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp()
    })
    return true
  } catch (error) {
    console.error('Error updating order:', error)
    return false
  }
}

// User Addresses
export const getUserAddresses = async (userId) => {
  try {
    const addressesRef = collections.addresses(userId)
    const q = query(addressesRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting addresses:', error)
    return []
  }
}

export const addUserAddress = async (userId, address) => {
  try {
    const addressesRef = collections.addresses(userId)
    const addressRef = await addDoc(addressesRef, {
      ...address,
      userId,
      createdAt: serverTimestamp(),
      isDefault: false
    })
    
    return { id: addressRef.id, ...address }
  } catch (error) {
    console.error('Error adding address:', error)
    return null
  }
}

export const updateUserAddress = async (userId, addressId, updates) => {
  try {
    const addressRef = doc(db, `users/${userId}/addresses/${addressId}`)
    await updateDoc(addressRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
    return true
  } catch (error) {
    console.error('Error updating address:', error)
    return false
  }
}

export const deleteUserAddress = async (userId, addressId) => {
  try {
    const addressRef = doc(db, `users/${userId}/addresses/${addressId}`)
    await deleteDoc(addressRef)
    return true
  } catch (error) {
    console.error('Error deleting address:', error)
    return false
  }
}

// Reviews
export const getProductReviews = async (productId) => {
  try {
    const q = query(
      collections.reviews,
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting reviews:', error)
    return []
  }
}

export const addReview = async (review) => {
  try {
    const reviewsRef = collections.reviews
    const reviewRef = await addDoc(reviewsRef, {
      ...review,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    
    return { id: reviewRef.id, ...review }
  } catch (error) {
    console.error('Error adding review:', error)
    return null
  }
}



