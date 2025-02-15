import { initializeApp, getApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCgJLg8WVTshdts3BtEQUuzOWGBvdYOp1A',
  authDomain: 'chess-chx.firebaseapp.com',
  projectId: 'chess-chx',
  storageBucket: 'chess-chx.firebasestorage.app',
  messagingSenderId: '370005160447',
  appId: '1:370005160447:web:5dc498264f4dd5f21977ca',
  measurementId: 'G-P9VQRH68QW',
}

// Initialize Firebase
let app
try {
  app = getApp()
} catch {
  app = initializeApp(firebaseConfig)
}

// Initialize services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

// Initialize Analytics only on client side
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { app, db, auth, storage, analytics }
