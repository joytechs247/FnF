'use client'

import { createContext, useState, useContext, useEffect, useRef } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { auth, db, collections } from '@/lib/firebase'
import { useCart } from '@/context/CartContext'



const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const cartSyncedRef = useRef(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)



        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

          if (userDoc.exists()) {
            setUserProfile({ id: userDoc.id, ...userDoc.data() })
          } else {
            const newUserProfile = {
              email: firebaseUser.email,
              displayName:
                firebaseUser.displayName ||
                firebaseUser.email.split('@')[0],
              photoURL: firebaseUser.photoURL || null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              role: 'customer',
              phoneNumber: '',
              addresses: [],
              wishlist: [],
              cart: []
            }

            await setDoc(doc(db, 'users', firebaseUser.uid), newUserProfile)
            setUserProfile({ id: firebaseUser.uid, ...newUserProfile })
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
          setUserProfile(null)
        }
      } else {
        setUser(null)
        setUserProfile(null)
        cartSyncedRef.current = false // reset on logout
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])


  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async (email, password, userData = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    if (userData.displayName) {
      await updateProfile(userCredential.user, { displayName: userData.displayName })
    }

    // Create user profile in Firestore
    const userProfile = {
      email: userCredential.user.email,
      displayName: userData.displayName || userCredential.user.email.split('@')[0],
      phoneNumber: userData.phone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'customer',
      addresses: [],
      wishlist: [],
      cart: [],
      ...userData
    }

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile)
    setUserProfile({ id: userCredential.user.uid, ...userProfile })

    return userCredential
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)

    // Check if user profile exists, create if not
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
    if (!userDoc.exists()) {
      const userProfile = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email.split('@')[0],
        photoURL: userCredential.user.photoURL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: 'customer',
        phoneNumber: '',
        addresses: [],
        wishlist: [],
        cart: []
      }

      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile)
      setUserProfile({ id: userCredential.user.uid, ...userProfile })
    } else {
      setUserProfile({ id: userDoc.id, ...userDoc.data() })
    }

    return userCredential
  }

  const logout = () => {
    localStorage.removeItem("fnf_cart_synced");
    return signOut(auth)
  }

  const updateUserProfile = async (data) => {
    if (!user) throw new Error('No user logged in')

    const updatedData = {
      ...data,
      updatedAt: new Date().toISOString()
    }

    await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true })
    setUserProfile(prev => ({ ...prev, ...updatedData }))
  }

  // Address management
  const addAddress = async (address) => {
    if (!user) throw new Error('No user logged in')

    const addressesRef = collections.addresses(user.uid)
    const newAddressRef = doc(addressesRef)

    const addressData = {
      ...address,
      id: newAddressRef.id,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      isDefault: false
    }

    await setDoc(newAddressRef, addressData)

    // Update user profile with new address
    const currentUserDoc = await getDoc(doc(db, 'users', user.uid))
    const userData = currentUserDoc.data()
    const updatedAddresses = [...(userData.addresses || []), addressData]

    await updateDoc(doc(db, 'users', user.uid), {
      addresses: updatedAddresses
    })

    setUserProfile(prev => ({
      ...prev,
      addresses: updatedAddresses
    }))

    return addressData
  }

  const updateAddress = async (addressId, updates) => {
    if (!user) throw new Error('No user logged in')

    const addressRef = doc(db, `users/${user.uid}/addresses/${addressId}`)
    await updateDoc(addressRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    })

    // Update in user profile
    const updatedAddresses = userProfile.addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updates } : addr
    )

    await updateDoc(doc(db, 'users', user.uid), {
      addresses: updatedAddresses
    })

    setUserProfile(prev => ({
      ...prev,
      addresses: updatedAddresses
    }))
  }

  const deleteAddress = async (addressId) => {
    if (!user) throw new Error('No user logged in')

    const addressRef = doc(db, `users/${user.uid}/addresses/${addressId}`)
    await deleteDoc(addressRef)

    const updatedAddresses = userProfile.addresses.filter(addr => addr.id !== addressId)

    await updateDoc(doc(db, 'users', user.uid), {
      addresses: updatedAddresses
    })

    setUserProfile(prev => ({
      ...prev,
      addresses: updatedAddresses
    }))
  }

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      login,
      signup,
      googleSignIn,
      logout,
      updateUserProfile,
      addAddress,
      updateAddress,
      deleteAddress
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)