import { createContext, useContext, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  confirmPasswordReset,
} from 'firebase/auth'
import {
  query,
  collection,
  getDocs,
  where,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useToastHook } from '../hooks/useToast'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [items, setItems] = useState([])
  const [username, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [watchlist, setWatchlist] = useState([])
  const [user] = useAuthState(auth)
  const [handleToast] = useToastHook()

  const logInWithEmailAndPassword = async (email, password) => {
    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
      handleToast({ message: err.message, status: 'error' })
    }
    setIsSubmitting(false)
  }

  const registerWithEmailAndPassword = async (username, email, password) => {
    setIsSubmitting(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setDoc(doc(db, 'users', email), {
        username,
        authProvider: 'local',
        email,
        savedTitles: [],
      })
    } catch (err) {
      console.error(err)
      handleToast({ message: err.message, status: 'error' })
    }
    setIsSubmitting(false)
  }

  const sendPasswordReset = async (email) => {
    setIsSubmitting(true)
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `http://localhost:3000/getstarted`,
      })
      handleToast({ message: `Password reset link sent!`, status: 'success' })
    } catch (err) {
      console.error(err)
      handleToast({ message: err.message, status: 'error' })
    }
    setIsSubmitting(false)
  }

  const resetPassword = async (oobCode, newPassword) => {
    setIsSubmitting(true)
    try {
      confirmPasswordReset(auth, oobCode, newPassword)
      handleToast({ message: `Password has been reset!`, status: 'success' })
    } catch (err) {
      console.error(err)
      handleToast({ message: err.message, status: 'error' })
    }
  }

  const logout = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'))
    if (items) {
      setItems(items)
    }
  }, [])

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setWatchlist(doc.data()?.savedTitles)
    })
  }, [user?.email])

  const fetchUserName = async () => {
    if (!user || !user.email) return
    try {
      const q = query(
        collection(db, 'users'),
        where('email', '==', user?.email)
      )
      const doc = await getDocs(q)
      const data = doc?.docs[0].data()
      setUserName(data.username)
    } catch (err) {
      console.error(err)
      handleToast({
        message: 'An error occured while fetching user data',
        status: 'error',
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        items,
        fetchUserName,
        username,
        registerWithEmailAndPassword,
        logInWithEmailAndPassword,
        logout,
        sendPasswordReset,
        resetPassword,
        isSubmitting,
        arrayUnion,
        updateDoc,
        auth,
        db,
        doc,
        watchlist,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const AuthService = () => useContext(UserContext)
