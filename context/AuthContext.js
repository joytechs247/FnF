// 'use client'

// import { createContext, useState, useContext, useEffect } from 'react'
// import { 
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup
// } from 'firebase/auth'
// import { auth } from '@/lib/firebase'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user)
//       setLoading(false)
//     })
//     return unsubscribe
//   }, [])

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const signup = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider()
//     return signInWithPopup(auth, provider)
//   }

//   const logout = () => {
//     return signOut(auth)
//   }

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       login,
//       signup,
//       googleSignIn,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)





'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUserProfile(userDoc.data())
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async (email, password, displayName = null) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    if (displayName) {
      await updateProfile(userCredential.user, { displayName })
    }

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      displayName: displayName || userCredential.user.email.split('@')[0],
      createdAt: new Date().toISOString(),
      orders: [],
      addresses: [],
      wishlist: []
    })

    return userCredential
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    
    // Check if user profile exists, create if not
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email.split('@')[0],
        createdAt: new Date().toISOString(),
        orders: [],
        addresses: [],
        wishlist: []
      })
    }
    
    return userCredential
  }

  const logout = () => {
    return signOut(auth)
  }

  const updateUserProfile = async (data) => {
    if (!user) throw new Error('No user logged in')
    
    await setDoc(doc(db, 'users', user.uid), data, { merge: true })
    setUserProfile(prev => ({ ...prev, ...data }))
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
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)